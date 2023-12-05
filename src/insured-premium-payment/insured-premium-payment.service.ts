import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CashReceiptEntity } from "./cashreceipt.entity";
import { AppliedPaymentDto } from "./data-transfer-objects/applied-payments";
import { InsuredPremiumPaymentDto } from "./data-transfer-objects/insured-premium-payment";
import { OpenBalanceDto } from "./data-transfer-objects/open-balance";
import { UnappliedPaymentDto } from "./data-transfer-objects/unapplied-payments";
import { AgencyConfigurationEntity } from "./entities/agency-configuration.entity";
import { CashReceiptDeletedRecordDetails } from "./entities/cash-receipt-delete-record.entity";


@Injectable()
export class InusredPremiumPaymentService {

    constructor(
        @InjectRepository(CashReceiptEntity, 'dwfinance')
        private crRepository: Repository<CashReceiptEntity>,
        @InjectRepository(CashReceiptDeletedRecordDetails, 'dwfinance')
        private crdRepository: Repository<CashReceiptDeletedRecordDetails>,
        @InjectRepository(AgencyConfigurationEntity)
        private rdmRepository: Repository<AgencyConfigurationEntity>,
    ) { }

    async getCashReceiptDetails(agency?: string[]) {
        let queryResult;
        const invoicedpremiumdata = new InsuredPremiumPaymentDto();
        let sql = `exec [dbo].[udp_GetCashReceiptDetails]`;
        await this.crRepository.query(sql)
            .then(res => {
                queryResult = res;
                // Check if the agency array includes "Renaissance Insurance Group, LLC"
                const skipAgencyFilter = agency.includes('Renaissance Insurance Group, LLC');
                if (!skipAgencyFilter && agency.length > 0) {
                    queryResult = queryResult.filter((element) => agency.includes(element.AgencyName));
                }
                const pattern = /[^0-9.]/g;

                const [unappliedPayments, appliedPayments, openBalances] = queryResult.reduce((acc, payment: CashReceiptEntity) => {
                    if (payment.Source === 'Unapplied' && !payment.Description.toLowerCase().includes('delete')) {
                        const unappliedPayment = new UnappliedPaymentDto();
                        unappliedPayment.receiveddate = payment.ActivityDate;
                        unappliedPayment.description = payment.Description;

                        unappliedPayment.amount = pattern.test(payment.Amount) ? '' : payment.Amount;
                        unappliedPayment.insuredname = payment.InsuredName;
                        unappliedPayment.policynumber = payment['Policy#'];
                        unappliedPayment.agency = payment.AgencyName;
                        unappliedPayment.division = payment.DepartmentName;

                        acc[0].push(unappliedPayment);
                    } else if (payment.Source === 'Applied') {
                        const appliedPayment = new AppliedPaymentDto();
                        appliedPayment.payementposteddate = payment.ActivityDate;
                        appliedPayment.description = payment.Description;
                        appliedPayment.amount = pattern.test(payment.Amount) ? '' : payment.Amount;
                        appliedPayment.insuredname = payment.InsuredName;
                        appliedPayment.policynumber = payment['Policy#'];
                        appliedPayment.agency = payment.AgencyName;
                        appliedPayment.division = payment.DepartmentName;
                        acc[1].push(appliedPayment);
                    } else if (payment.Source === 'OpenBalances') {
                        const openBalance = new OpenBalanceDto();
                        openBalance.policyeffectivedate = payment.ActivityDate;
                        openBalance.effectiveaged = payment.AgeEff;
                        openBalance.invoicedaged = payment.AgeInv;
                        openBalance.totalamountdue = pattern.test(payment.Amount) ? '' : payment.Amount;
                        openBalance.currentbalance = payment.RemainingAmount;
                        openBalance.insuredname = payment.InsuredName;
                        openBalance.policynumber = payment['Policy#'];
                        openBalance.agency = payment.AgencyName;
                        openBalance.division = payment.DepartmentName;
                        openBalance.invoicenumber = payment['Invoice#'];
                        acc[2].push(openBalance);
                    }
                    return acc;
                }, [[], [], []]);
                invoicedpremiumdata.unappliedpayment = unappliedPayments.sort((a, b) => b.receiveddate - a.receiveddate);;
                invoicedpremiumdata.appliedpayment = appliedPayments.sort((a, b) => b.payementposteddate - a.payementposteddate);;
                invoicedpremiumdata.openbalance = openBalances.sort((a, b) => b.policyeffectivedate - a.policyeffectivedate);;
            })
            .catch((exception) => {
                throw exception;
            });

        return invoicedpremiumdata;
    }

    async getAllAgencies() {
        let queryResult;
        let sql = `SELECT DISTINCT LongName
                FROM [RAISDataModel].[dbo].[dimAgencyConfiguration]
                ORDER BY LongName ASC`;
        await this.rdmRepository.query(sql)
            .then(res => {
                queryResult = res.map(m => m.LongName);
            })
            .catch((exception) => {
                throw exception;
            });
        return queryResult;
    }

    create(paymentdto: any): Boolean {
        const recordToBeDeleted = new CashReceiptDeletedRecordDetails();
        if (paymentdto.payementposteddate) {
            recordToBeDeleted.ActivityDate = paymentdto.payementposteddate;
            recordToBeDeleted.Source = 'Applied';
        } else if (paymentdto.receiveddate) {
            recordToBeDeleted.ActivityDate = paymentdto.receiveddate;
            recordToBeDeleted.Source = 'Unapplied';
        }

        recordToBeDeleted.AgencyName = paymentdto.agency;
        recordToBeDeleted.InsuredName = paymentdto.insuredname;
        recordToBeDeleted.Description = paymentdto.description;
        recordToBeDeleted.DepartmentName = paymentdto.division;
        recordToBeDeleted.PolicyNumber = paymentdto.policynumber;
        recordToBeDeleted.Amount = paymentdto.amount;
        recordToBeDeleted.IsDeleted = true;
        try {
            this.crdRepository.save(recordToBeDeleted);
            return true;
        } catch (exception) {
            return false;
        }

    }

    async getInvoiceDataDetails(invoiceNumber: string) {
        let queryResult;
        let sql = `SELECT
                    fih.LongName,
                    fih.CustomerNumber, fih.SortName, fih.Addr1, fih.City, fih.[State], fih.ZipCode,
                    fih.InvNo, fih.InvDate,
                    fih.PolNo, fih.ExecFullName, fih.WritingCompanyName, fih.PolEffDate, fih.PolExpDate, 
                    fih.TranType, fih.[Description], fih.TranTypeDescription, fih.TotalCommPremAmt
                    FROM [DWFinance].[dbo].[InvoiceData] fih WHERE  fih.InvNo = '`+ invoiceNumber + `'`;
        await this.crRepository.query(sql)
            .then(res => {
                queryResult = res;
            })
            .catch((exception) => {
                throw exception;
            });
        return queryResult;
    }


}
