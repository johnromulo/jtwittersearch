import { SelectQueryBuilder } from 'typeorm';

export default <T>(
  alias: string,
  query: SelectQueryBuilder<T>,
  filers: object[]
): SelectQueryBuilder<T> => {
  filers.forEach((filter: any) => {
    const key = Object.keys(filter)[0];

    if (filter[key] !== undefined) {
      if (filter[key] instanceof Array) {
        // <@ ARRAY[:...negotiationTypes]
        query.where(`${alias}.${key} <@  ARRAY[:...${key}]`, {
          ...filter,
        });
      } else {
        query.where(`${alias}.${key} = :${key}`, { ...filter });
      }
    }
  });

  return query;
};
