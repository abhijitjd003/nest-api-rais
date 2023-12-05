import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const logger = new Logger('Cacheable');

export const Cacheable = (ttl?: number) => {
    const injectCache = Inject(CACHE_MANAGER);

    return function (
        target: any,
        _propertyName: string,
        descriptor: PropertyDescriptor,
    ) {
        injectCache(target, 'cache');
        const decoratedMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const cacheKey = getCacheKey(
                target.constructor.name,
                decoratedMethod?.name,
                args,
            );

            const cachedData = await this.cache.get(cacheKey);
            if (cachedData) {
                return cachedData;
            }

            const response = await decoratedMethod.apply(this, args);
            if (ttl) {
                this.cache.set(cacheKey, response, { ttl: ttl });
            } else {
                this.cache.set(cacheKey, response);
            }
            return response;
        };
    };
};

export const getCacheKey = (
    className: string,
    methodName: string,
    ...args: any[]
) => {
    let cacheKey = `${className}-${methodName}`;
    if (args && args.length > 0) {
        cacheKey = `${cacheKey}_${args.join('_')}`;
    }
    return cacheKey;
};

// save data in cache from DB
export const PutCacheable = (ttl?: number, key?: string) => {
    const injectCache = Inject(CACHE_MANAGER);
    return function (
        target: any,
        _propertyName: string,
        descriptor: PropertyDescriptor,
    ) {
        injectCache(target, 'cache');

        const decoratedMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            // const cacheKey = key; //getCacheKey(target.constructor.name, decoratedMethod?.name, args)
            const cacheItemsPerKey: number = this.configService.get('db.redis.items');
            let cacheKeys = await this.cache.keys('*');
            if (cacheKeys.length > 0) {
                for (let i = 0; i < cacheKeys.length; i++) {
                    const cacheKey = cacheKeys[i];
                    if (key == null || cacheKey.includes(key)) {
                        logger.log(`old cache ${cacheKey} deleted!`);
                        await this.cache.del(cacheKey);
                    }
                }
            }
            let cacheNumber = 1;
            const response = await decoratedMethod.apply(this, args);
            await setCacheInChunksRecursive(
                this,
                ttl,
                cacheItemsPerKey,
                cacheNumber,
                response,
                key,
            );
            return response;
        };
    };
};

async function setCacheInChunksRecursive(
    cache,
    ttl,
    cacheItemsPerKey,
    cacheNumber,
    reponseData,
    cacheKeyPrefix,
) {
    try {
        let fetchRecordsLength = 0;

        if (reponseData.length > cacheItemsPerKey) {
            fetchRecordsLength = cacheItemsPerKey;
        } else {
            fetchRecordsLength = reponseData.length;
        }
        let indexedCacheKey = cacheKeyPrefix + cacheNumber;
        let splicedObjects = reponseData.splice(0, fetchRecordsLength);
        // cache.cache.del(cacheKey);

        if (ttl) {
            await cache.cache.set(indexedCacheKey, splicedObjects, { ttl: ttl });
        } else {
            await cache.cache.set(indexedCacheKey, splicedObjects);
        }
        logger.log(`new cache ${indexedCacheKey} set in key`);
        if (reponseData.length > 1) {
            setCacheInChunksRecursive(
                cache,
                ttl,
                cacheItemsPerKey,
                cacheNumber + 1,
                reponseData,
                cacheKeyPrefix,
            );
        }
    } catch (error) {
        logger.error(error);
    }
}

export const GetCacheable = (ttl?: number, key?: string, itemLimit?: number) => {
    const injectCache = Inject(CACHE_MANAGER);
    return function (
        target: any,
        _propertyName: string,
        descriptor: PropertyDescriptor,
    ) {
        injectCache(target, 'cache');
        const decoratedMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            let searchValue = args[0];
            searchValue = searchValue ? searchValue.trim().toLowerCase() : null;
            let cacheKeys = await this.cache.keys('*');
            const promises = [];
            if (cacheKeys && cacheKeys.length > 0) {
                for (let i = 0; i < cacheKeys.length; i++) {
                    const cacheKey = cacheKeys[i];
                    // logger.log(`Found cache key : ${cacheKey}`);
                    if (key == null || cacheKey.includes(key)) {
                        let result = filteringAsync(cacheKey, searchValue, this.cache);
                        if (result != null || result != undefined) {
                            promises.push(result);
                        }
                    }
                }
                return Promise.all(promises).then((resultsArr: any[]) => {
                    let finalResults = [];
                    resultsArr.forEach((results) => {
                        if (results) {
                            finalResults = [...finalResults, ...results];
                        }
                    });
                    if (itemLimit && itemLimit > 0) {
                        return finalResults.splice(0, itemLimit);
                    } else {
                        return finalResults;
                    }
                });
            } else {
                return await decoratedMethod.apply(this, args);
            }
        };
    };
};

async function filteringAsync(cacheKey, searchValue, cacheInstance) {
    // return new Promise((resolve, reject) => {
    let cacheData = await cacheInstance.get(cacheKey);
    if (searchValue) {
        let filteredRecord = cacheData.filter(
            (objVal) =>
                objVal.LowerSortName.includes(searchValue) ||
                objVal.LowerFullAddress.includes(searchValue),
        );
        if (filteredRecord.length > 0) {
            return filteredRecord;
        }
    } else {
        return cacheData;
    }
}
