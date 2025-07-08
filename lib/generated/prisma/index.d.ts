
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model Manager
 * 
 */
export type Manager = $Result.DefaultSelection<Prisma.$ManagerPayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Brief
 * 
 */
export type Brief = $Result.DefaultSelection<Prisma.$BriefPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BriefStatus: {
  New: 'New',
  Sent: 'Sent',
  Shared: 'Shared',
  Draft: 'Draft',
  Stale: 'Stale'
};

export type BriefStatus = (typeof BriefStatus)[keyof typeof BriefStatus]


export const ManagerStatus: {
  active: 'active',
  invited: 'invited',
  deactivated: 'deactivated'
};

export type ManagerStatus = (typeof ManagerStatus)[keyof typeof ManagerStatus]


export const ClientStatus: {
  active: 'active',
  invited: 'invited',
  deactivated: 'deactivated'
};

export type ClientStatus = (typeof ClientStatus)[keyof typeof ClientStatus]


export const ProjectType: {
  General: 'General',
  Motion: 'Motion',
  Events: 'Events',
  Web: 'Web',
  UX_UI_Website: 'UX_UI_Website',
  Event_Tradeshow: 'Event_Tradeshow',
  Video_Animation: 'Video_Animation',
  Digital_Paid_Campaign: 'Digital_Paid_Campaign'
};

export type ProjectType = (typeof ProjectType)[keyof typeof ProjectType]


export const UserRole: {
  admin: 'admin',
  manager: 'manager'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type BriefStatus = $Enums.BriefStatus

export const BriefStatus: typeof $Enums.BriefStatus

export type ManagerStatus = $Enums.ManagerStatus

export const ManagerStatus: typeof $Enums.ManagerStatus

export type ClientStatus = $Enums.ClientStatus

export const ClientStatus: typeof $Enums.ClientStatus

export type ProjectType = $Enums.ProjectType

export const ProjectType: typeof $Enums.ProjectType

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Organizations
 * const organizations = await prisma.organization.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Organizations
   * const organizations = await prisma.organization.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.manager`: Exposes CRUD operations for the **Manager** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Managers
    * const managers = await prisma.manager.findMany()
    * ```
    */
  get manager(): Prisma.ManagerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.brief`: Exposes CRUD operations for the **Brief** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Briefs
    * const briefs = await prisma.brief.findMany()
    * ```
    */
  get brief(): Prisma.BriefDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.0
   * Query Engine version: 9c30299f5a0ea26a96790e13f796dc6094db3173
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Organization: 'Organization',
    Manager: 'Manager',
    Client: 'Client',
    Brief: 'Brief'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "organization" | "manager" | "client" | "brief"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      Manager: {
        payload: Prisma.$ManagerPayload<ExtArgs>
        fields: Prisma.ManagerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ManagerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ManagerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>
          }
          findFirst: {
            args: Prisma.ManagerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ManagerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>
          }
          findMany: {
            args: Prisma.ManagerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>[]
          }
          create: {
            args: Prisma.ManagerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>
          }
          createMany: {
            args: Prisma.ManagerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ManagerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>[]
          }
          delete: {
            args: Prisma.ManagerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>
          }
          update: {
            args: Prisma.ManagerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>
          }
          deleteMany: {
            args: Prisma.ManagerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ManagerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ManagerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>[]
          }
          upsert: {
            args: Prisma.ManagerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ManagerPayload>
          }
          aggregate: {
            args: Prisma.ManagerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateManager>
          }
          groupBy: {
            args: Prisma.ManagerGroupByArgs<ExtArgs>
            result: $Utils.Optional<ManagerGroupByOutputType>[]
          }
          count: {
            args: Prisma.ManagerCountArgs<ExtArgs>
            result: $Utils.Optional<ManagerCountAggregateOutputType> | number
          }
        }
      }
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Brief: {
        payload: Prisma.$BriefPayload<ExtArgs>
        fields: Prisma.BriefFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BriefFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BriefPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BriefFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BriefPayload>
          }
          findFirst: {
            args: Prisma.BriefFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BriefPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BriefFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BriefPayload>
          }
          findMany: {
            args: Prisma.BriefFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BriefPayload>[]
          }
          create: {
            args: Prisma.BriefCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BriefPayload>
          }
          createMany: {
            args: Prisma.BriefCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BriefCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BriefPayload>[]
          }
          delete: {
            args: Prisma.BriefDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BriefPayload>
          }
          update: {
            args: Prisma.BriefUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BriefPayload>
          }
          deleteMany: {
            args: Prisma.BriefDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BriefUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BriefUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BriefPayload>[]
          }
          upsert: {
            args: Prisma.BriefUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BriefPayload>
          }
          aggregate: {
            args: Prisma.BriefAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBrief>
          }
          groupBy: {
            args: Prisma.BriefGroupByArgs<ExtArgs>
            result: $Utils.Optional<BriefGroupByOutputType>[]
          }
          count: {
            args: Prisma.BriefCountArgs<ExtArgs>
            result: $Utils.Optional<BriefCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    organization?: OrganizationOmit
    manager?: ManagerOmit
    client?: ClientOmit
    brief?: BriefOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    managers: number
    clients: number
    briefs: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    managers?: boolean | OrganizationCountOutputTypeCountManagersArgs
    clients?: boolean | OrganizationCountOutputTypeCountClientsArgs
    briefs?: boolean | OrganizationCountOutputTypeCountBriefsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountManagersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ManagerWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountClientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountBriefsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BriefWhereInput
  }


  /**
   * Count Type ManagerCountOutputType
   */

  export type ManagerCountOutputType = {
    briefs: number
  }

  export type ManagerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    briefs?: boolean | ManagerCountOutputTypeCountBriefsArgs
  }

  // Custom InputTypes
  /**
   * ManagerCountOutputType without action
   */
  export type ManagerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ManagerCountOutputType
     */
    select?: ManagerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ManagerCountOutputType without action
   */
  export type ManagerCountOutputTypeCountBriefsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BriefWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    briefs: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    briefs?: boolean | ClientCountOutputTypeCountBriefsArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountBriefsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BriefWhereInput
  }


  /**
   * Count Type BriefCountOutputType
   */

  export type BriefCountOutputType = {
    managers: number
  }

  export type BriefCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    managers?: boolean | BriefCountOutputTypeCountManagersArgs
  }

  // Custom InputTypes
  /**
   * BriefCountOutputType without action
   */
  export type BriefCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BriefCountOutputType
     */
    select?: BriefCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BriefCountOutputType without action
   */
  export type BriefCountOutputTypeCountManagersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ManagerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _avg: OrganizationAvgAggregateOutputType | null
    _sum: OrganizationSumAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationAvgAggregateOutputType = {
    id: number | null
  }

  export type OrganizationSumAggregateOutputType = {
    id: number | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: number | null
    name: string | null
    ai_support: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: number | null
    name: string | null
    ai_support: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    ai_support: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type OrganizationAvgAggregateInputType = {
    id?: true
  }

  export type OrganizationSumAggregateInputType = {
    id?: true
  }

  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    ai_support?: true
    created_at?: true
    updated_at?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    ai_support?: true
    created_at?: true
    updated_at?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    ai_support?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrganizationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrganizationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _avg?: OrganizationAvgAggregateInputType
    _sum?: OrganizationSumAggregateInputType
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: number
    name: string
    ai_support: boolean
    created_at: Date
    updated_at: Date
    _count: OrganizationCountAggregateOutputType | null
    _avg: OrganizationAvgAggregateOutputType | null
    _sum: OrganizationSumAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ai_support?: boolean
    created_at?: boolean
    updated_at?: boolean
    managers?: boolean | Organization$managersArgs<ExtArgs>
    clients?: boolean | Organization$clientsArgs<ExtArgs>
    briefs?: boolean | Organization$briefsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ai_support?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    ai_support?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    ai_support?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "ai_support" | "created_at" | "updated_at", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    managers?: boolean | Organization$managersArgs<ExtArgs>
    clients?: boolean | Organization$clientsArgs<ExtArgs>
    briefs?: boolean | Organization$briefsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      managers: Prisma.$ManagerPayload<ExtArgs>[]
      clients: Prisma.$ClientPayload<ExtArgs>[]
      briefs: Prisma.$BriefPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      ai_support: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    managers<T extends Organization$managersArgs<ExtArgs> = {}>(args?: Subset<T, Organization$managersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clients<T extends Organization$clientsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$clientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    briefs<T extends Organization$briefsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$briefsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'Int'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly ai_support: FieldRef<"Organization", 'Boolean'>
    readonly created_at: FieldRef<"Organization", 'DateTime'>
    readonly updated_at: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.managers
   */
  export type Organization$managersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    where?: ManagerWhereInput
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[]
    cursor?: ManagerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[]
  }

  /**
   * Organization.clients
   */
  export type Organization$clientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    cursor?: ClientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Organization.briefs
   */
  export type Organization$briefsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefInclude<ExtArgs> | null
    where?: BriefWhereInput
    orderBy?: BriefOrderByWithRelationInput | BriefOrderByWithRelationInput[]
    cursor?: BriefWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BriefScalarFieldEnum | BriefScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model Manager
   */

  export type AggregateManager = {
    _count: ManagerCountAggregateOutputType | null
    _avg: ManagerAvgAggregateOutputType | null
    _sum: ManagerSumAggregateOutputType | null
    _min: ManagerMinAggregateOutputType | null
    _max: ManagerMaxAggregateOutputType | null
  }

  export type ManagerAvgAggregateOutputType = {
    id: number | null
    organization_id: number | null
  }

  export type ManagerSumAggregateOutputType = {
    id: number | null
    organization_id: number | null
  }

  export type ManagerMinAggregateOutputType = {
    id: number | null
    name: string | null
    title: string | null
    avatar: string | null
    email: string | null
    organization_id: number | null
    status: $Enums.ManagerStatus | null
    role: $Enums.UserRole | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ManagerMaxAggregateOutputType = {
    id: number | null
    name: string | null
    title: string | null
    avatar: string | null
    email: string | null
    organization_id: number | null
    status: $Enums.ManagerStatus | null
    role: $Enums.UserRole | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ManagerCountAggregateOutputType = {
    id: number
    name: number
    title: number
    avatar: number
    email: number
    organization_id: number
    status: number
    role: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ManagerAvgAggregateInputType = {
    id?: true
    organization_id?: true
  }

  export type ManagerSumAggregateInputType = {
    id?: true
    organization_id?: true
  }

  export type ManagerMinAggregateInputType = {
    id?: true
    name?: true
    title?: true
    avatar?: true
    email?: true
    organization_id?: true
    status?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type ManagerMaxAggregateInputType = {
    id?: true
    name?: true
    title?: true
    avatar?: true
    email?: true
    organization_id?: true
    status?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type ManagerCountAggregateInputType = {
    id?: true
    name?: true
    title?: true
    avatar?: true
    email?: true
    organization_id?: true
    status?: true
    role?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ManagerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Manager to aggregate.
     */
    where?: ManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Managers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Managers
    **/
    _count?: true | ManagerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ManagerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ManagerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ManagerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ManagerMaxAggregateInputType
  }

  export type GetManagerAggregateType<T extends ManagerAggregateArgs> = {
        [P in keyof T & keyof AggregateManager]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateManager[P]>
      : GetScalarType<T[P], AggregateManager[P]>
  }




  export type ManagerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ManagerWhereInput
    orderBy?: ManagerOrderByWithAggregationInput | ManagerOrderByWithAggregationInput[]
    by: ManagerScalarFieldEnum[] | ManagerScalarFieldEnum
    having?: ManagerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ManagerCountAggregateInputType | true
    _avg?: ManagerAvgAggregateInputType
    _sum?: ManagerSumAggregateInputType
    _min?: ManagerMinAggregateInputType
    _max?: ManagerMaxAggregateInputType
  }

  export type ManagerGroupByOutputType = {
    id: number
    name: string
    title: string | null
    avatar: string | null
    email: string | null
    organization_id: number | null
    status: $Enums.ManagerStatus
    role: $Enums.UserRole
    created_at: Date
    updated_at: Date
    _count: ManagerCountAggregateOutputType | null
    _avg: ManagerAvgAggregateOutputType | null
    _sum: ManagerSumAggregateOutputType | null
    _min: ManagerMinAggregateOutputType | null
    _max: ManagerMaxAggregateOutputType | null
  }

  type GetManagerGroupByPayload<T extends ManagerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ManagerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ManagerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ManagerGroupByOutputType[P]>
            : GetScalarType<T[P], ManagerGroupByOutputType[P]>
        }
      >
    >


  export type ManagerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    title?: boolean
    avatar?: boolean
    email?: boolean
    organization_id?: boolean
    status?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | Manager$organizationArgs<ExtArgs>
    briefs?: boolean | Manager$briefsArgs<ExtArgs>
    _count?: boolean | ManagerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["manager"]>

  export type ManagerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    title?: boolean
    avatar?: boolean
    email?: boolean
    organization_id?: boolean
    status?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | Manager$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["manager"]>

  export type ManagerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    title?: boolean
    avatar?: boolean
    email?: boolean
    organization_id?: boolean
    status?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | Manager$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["manager"]>

  export type ManagerSelectScalar = {
    id?: boolean
    name?: boolean
    title?: boolean
    avatar?: boolean
    email?: boolean
    organization_id?: boolean
    status?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ManagerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "title" | "avatar" | "email" | "organization_id" | "status" | "role" | "created_at" | "updated_at", ExtArgs["result"]["manager"]>
  export type ManagerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Manager$organizationArgs<ExtArgs>
    briefs?: boolean | Manager$briefsArgs<ExtArgs>
    _count?: boolean | ManagerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ManagerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Manager$organizationArgs<ExtArgs>
  }
  export type ManagerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Manager$organizationArgs<ExtArgs>
  }

  export type $ManagerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Manager"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      briefs: Prisma.$BriefPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      title: string | null
      avatar: string | null
      email: string | null
      organization_id: number | null
      status: $Enums.ManagerStatus
      role: $Enums.UserRole
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["manager"]>
    composites: {}
  }

  type ManagerGetPayload<S extends boolean | null | undefined | ManagerDefaultArgs> = $Result.GetResult<Prisma.$ManagerPayload, S>

  type ManagerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ManagerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ManagerCountAggregateInputType | true
    }

  export interface ManagerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Manager'], meta: { name: 'Manager' } }
    /**
     * Find zero or one Manager that matches the filter.
     * @param {ManagerFindUniqueArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ManagerFindUniqueArgs>(args: SelectSubset<T, ManagerFindUniqueArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Manager that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ManagerFindUniqueOrThrowArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ManagerFindUniqueOrThrowArgs>(args: SelectSubset<T, ManagerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Manager that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerFindFirstArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ManagerFindFirstArgs>(args?: SelectSubset<T, ManagerFindFirstArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Manager that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerFindFirstOrThrowArgs} args - Arguments to find a Manager
     * @example
     * // Get one Manager
     * const manager = await prisma.manager.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ManagerFindFirstOrThrowArgs>(args?: SelectSubset<T, ManagerFindFirstOrThrowArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Managers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Managers
     * const managers = await prisma.manager.findMany()
     * 
     * // Get first 10 Managers
     * const managers = await prisma.manager.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const managerWithIdOnly = await prisma.manager.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ManagerFindManyArgs>(args?: SelectSubset<T, ManagerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Manager.
     * @param {ManagerCreateArgs} args - Arguments to create a Manager.
     * @example
     * // Create one Manager
     * const Manager = await prisma.manager.create({
     *   data: {
     *     // ... data to create a Manager
     *   }
     * })
     * 
     */
    create<T extends ManagerCreateArgs>(args: SelectSubset<T, ManagerCreateArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Managers.
     * @param {ManagerCreateManyArgs} args - Arguments to create many Managers.
     * @example
     * // Create many Managers
     * const manager = await prisma.manager.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ManagerCreateManyArgs>(args?: SelectSubset<T, ManagerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Managers and returns the data saved in the database.
     * @param {ManagerCreateManyAndReturnArgs} args - Arguments to create many Managers.
     * @example
     * // Create many Managers
     * const manager = await prisma.manager.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Managers and only return the `id`
     * const managerWithIdOnly = await prisma.manager.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ManagerCreateManyAndReturnArgs>(args?: SelectSubset<T, ManagerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Manager.
     * @param {ManagerDeleteArgs} args - Arguments to delete one Manager.
     * @example
     * // Delete one Manager
     * const Manager = await prisma.manager.delete({
     *   where: {
     *     // ... filter to delete one Manager
     *   }
     * })
     * 
     */
    delete<T extends ManagerDeleteArgs>(args: SelectSubset<T, ManagerDeleteArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Manager.
     * @param {ManagerUpdateArgs} args - Arguments to update one Manager.
     * @example
     * // Update one Manager
     * const manager = await prisma.manager.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ManagerUpdateArgs>(args: SelectSubset<T, ManagerUpdateArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Managers.
     * @param {ManagerDeleteManyArgs} args - Arguments to filter Managers to delete.
     * @example
     * // Delete a few Managers
     * const { count } = await prisma.manager.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ManagerDeleteManyArgs>(args?: SelectSubset<T, ManagerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Managers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Managers
     * const manager = await prisma.manager.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ManagerUpdateManyArgs>(args: SelectSubset<T, ManagerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Managers and returns the data updated in the database.
     * @param {ManagerUpdateManyAndReturnArgs} args - Arguments to update many Managers.
     * @example
     * // Update many Managers
     * const manager = await prisma.manager.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Managers and only return the `id`
     * const managerWithIdOnly = await prisma.manager.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ManagerUpdateManyAndReturnArgs>(args: SelectSubset<T, ManagerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Manager.
     * @param {ManagerUpsertArgs} args - Arguments to update or create a Manager.
     * @example
     * // Update or create a Manager
     * const manager = await prisma.manager.upsert({
     *   create: {
     *     // ... data to create a Manager
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Manager we want to update
     *   }
     * })
     */
    upsert<T extends ManagerUpsertArgs>(args: SelectSubset<T, ManagerUpsertArgs<ExtArgs>>): Prisma__ManagerClient<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Managers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerCountArgs} args - Arguments to filter Managers to count.
     * @example
     * // Count the number of Managers
     * const count = await prisma.manager.count({
     *   where: {
     *     // ... the filter for the Managers we want to count
     *   }
     * })
    **/
    count<T extends ManagerCountArgs>(
      args?: Subset<T, ManagerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ManagerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Manager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ManagerAggregateArgs>(args: Subset<T, ManagerAggregateArgs>): Prisma.PrismaPromise<GetManagerAggregateType<T>>

    /**
     * Group by Manager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ManagerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ManagerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ManagerGroupByArgs['orderBy'] }
        : { orderBy?: ManagerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ManagerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetManagerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Manager model
   */
  readonly fields: ManagerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Manager.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ManagerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends Manager$organizationArgs<ExtArgs> = {}>(args?: Subset<T, Manager$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    briefs<T extends Manager$briefsArgs<ExtArgs> = {}>(args?: Subset<T, Manager$briefsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Manager model
   */
  interface ManagerFieldRefs {
    readonly id: FieldRef<"Manager", 'Int'>
    readonly name: FieldRef<"Manager", 'String'>
    readonly title: FieldRef<"Manager", 'String'>
    readonly avatar: FieldRef<"Manager", 'String'>
    readonly email: FieldRef<"Manager", 'String'>
    readonly organization_id: FieldRef<"Manager", 'Int'>
    readonly status: FieldRef<"Manager", 'ManagerStatus'>
    readonly role: FieldRef<"Manager", 'UserRole'>
    readonly created_at: FieldRef<"Manager", 'DateTime'>
    readonly updated_at: FieldRef<"Manager", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Manager findUnique
   */
  export type ManagerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Manager to fetch.
     */
    where: ManagerWhereUniqueInput
  }

  /**
   * Manager findUniqueOrThrow
   */
  export type ManagerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Manager to fetch.
     */
    where: ManagerWhereUniqueInput
  }

  /**
   * Manager findFirst
   */
  export type ManagerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Manager to fetch.
     */
    where?: ManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Managers.
     */
    cursor?: ManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Managers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Managers.
     */
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[]
  }

  /**
   * Manager findFirstOrThrow
   */
  export type ManagerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Manager to fetch.
     */
    where?: ManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Managers.
     */
    cursor?: ManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Managers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Managers.
     */
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[]
  }

  /**
   * Manager findMany
   */
  export type ManagerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * Filter, which Managers to fetch.
     */
    where?: ManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Managers to fetch.
     */
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Managers.
     */
    cursor?: ManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Managers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Managers.
     */
    skip?: number
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[]
  }

  /**
   * Manager create
   */
  export type ManagerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * The data needed to create a Manager.
     */
    data: XOR<ManagerCreateInput, ManagerUncheckedCreateInput>
  }

  /**
   * Manager createMany
   */
  export type ManagerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Managers.
     */
    data: ManagerCreateManyInput | ManagerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Manager createManyAndReturn
   */
  export type ManagerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * The data used to create many Managers.
     */
    data: ManagerCreateManyInput | ManagerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Manager update
   */
  export type ManagerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * The data needed to update a Manager.
     */
    data: XOR<ManagerUpdateInput, ManagerUncheckedUpdateInput>
    /**
     * Choose, which Manager to update.
     */
    where: ManagerWhereUniqueInput
  }

  /**
   * Manager updateMany
   */
  export type ManagerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Managers.
     */
    data: XOR<ManagerUpdateManyMutationInput, ManagerUncheckedUpdateManyInput>
    /**
     * Filter which Managers to update
     */
    where?: ManagerWhereInput
    /**
     * Limit how many Managers to update.
     */
    limit?: number
  }

  /**
   * Manager updateManyAndReturn
   */
  export type ManagerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * The data used to update Managers.
     */
    data: XOR<ManagerUpdateManyMutationInput, ManagerUncheckedUpdateManyInput>
    /**
     * Filter which Managers to update
     */
    where?: ManagerWhereInput
    /**
     * Limit how many Managers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Manager upsert
   */
  export type ManagerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * The filter to search for the Manager to update in case it exists.
     */
    where: ManagerWhereUniqueInput
    /**
     * In case the Manager found by the `where` argument doesn't exist, create a new Manager with this data.
     */
    create: XOR<ManagerCreateInput, ManagerUncheckedCreateInput>
    /**
     * In case the Manager was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ManagerUpdateInput, ManagerUncheckedUpdateInput>
  }

  /**
   * Manager delete
   */
  export type ManagerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    /**
     * Filter which Manager to delete.
     */
    where: ManagerWhereUniqueInput
  }

  /**
   * Manager deleteMany
   */
  export type ManagerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Managers to delete
     */
    where?: ManagerWhereInput
    /**
     * Limit how many Managers to delete.
     */
    limit?: number
  }

  /**
   * Manager.organization
   */
  export type Manager$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * Manager.briefs
   */
  export type Manager$briefsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefInclude<ExtArgs> | null
    where?: BriefWhereInput
    orderBy?: BriefOrderByWithRelationInput | BriefOrderByWithRelationInput[]
    cursor?: BriefWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BriefScalarFieldEnum | BriefScalarFieldEnum[]
  }

  /**
   * Manager without action
   */
  export type ManagerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
  }


  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientAvgAggregateOutputType = {
    id: number | null
    organization_id: number | null
  }

  export type ClientSumAggregateOutputType = {
    id: number | null
    organization_id: number | null
  }

  export type ClientMinAggregateOutputType = {
    id: number | null
    name: string | null
    title: string | null
    avatar: string | null
    email: string | null
    organization_id: number | null
    status: $Enums.ClientStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: number | null
    name: string | null
    title: string | null
    avatar: string | null
    email: string | null
    organization_id: number | null
    status: $Enums.ClientStatus | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    name: number
    title: number
    avatar: number
    email: number
    organization_id: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ClientAvgAggregateInputType = {
    id?: true
    organization_id?: true
  }

  export type ClientSumAggregateInputType = {
    id?: true
    organization_id?: true
  }

  export type ClientMinAggregateInputType = {
    id?: true
    name?: true
    title?: true
    avatar?: true
    email?: true
    organization_id?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    name?: true
    title?: true
    avatar?: true
    email?: true
    organization_id?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    name?: true
    title?: true
    avatar?: true
    email?: true
    organization_id?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _avg?: ClientAvgAggregateInputType
    _sum?: ClientSumAggregateInputType
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: number
    name: string
    title: string | null
    avatar: string | null
    email: string | null
    organization_id: number | null
    status: $Enums.ClientStatus
    created_at: Date
    updated_at: Date
    _count: ClientCountAggregateOutputType | null
    _avg: ClientAvgAggregateOutputType | null
    _sum: ClientSumAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    title?: boolean
    avatar?: boolean
    email?: boolean
    organization_id?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | Client$organizationArgs<ExtArgs>
    briefs?: boolean | Client$briefsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    title?: boolean
    avatar?: boolean
    email?: boolean
    organization_id?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | Client$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    title?: boolean
    avatar?: boolean
    email?: boolean
    organization_id?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    organization?: boolean | Client$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    name?: boolean
    title?: boolean
    avatar?: boolean
    email?: boolean
    organization_id?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "title" | "avatar" | "email" | "organization_id" | "status" | "created_at" | "updated_at", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Client$organizationArgs<ExtArgs>
    briefs?: boolean | Client$briefsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Client$organizationArgs<ExtArgs>
  }
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | Client$organizationArgs<ExtArgs>
  }

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      briefs: Prisma.$BriefPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      title: string | null
      avatar: string | null
      email: string | null
      organization_id: number | null
      status: $Enums.ClientStatus
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends Client$organizationArgs<ExtArgs> = {}>(args?: Subset<T, Client$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    briefs<T extends Client$briefsArgs<ExtArgs> = {}>(args?: Subset<T, Client$briefsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'Int'>
    readonly name: FieldRef<"Client", 'String'>
    readonly title: FieldRef<"Client", 'String'>
    readonly avatar: FieldRef<"Client", 'String'>
    readonly email: FieldRef<"Client", 'String'>
    readonly organization_id: FieldRef<"Client", 'Int'>
    readonly status: FieldRef<"Client", 'ClientStatus'>
    readonly created_at: FieldRef<"Client", 'DateTime'>
    readonly updated_at: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.organization
   */
  export type Client$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * Client.briefs
   */
  export type Client$briefsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefInclude<ExtArgs> | null
    where?: BriefWhereInput
    orderBy?: BriefOrderByWithRelationInput | BriefOrderByWithRelationInput[]
    cursor?: BriefWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BriefScalarFieldEnum | BriefScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model Brief
   */

  export type AggregateBrief = {
    _count: BriefCountAggregateOutputType | null
    _avg: BriefAvgAggregateOutputType | null
    _sum: BriefSumAggregateOutputType | null
    _min: BriefMinAggregateOutputType | null
    _max: BriefMaxAggregateOutputType | null
  }

  export type BriefAvgAggregateOutputType = {
    id: number | null
    client_id: number | null
    organization_id: number | null
    progress: number | null
  }

  export type BriefSumAggregateOutputType = {
    id: number | null
    client_id: number | null
    organization_id: number | null
    progress: number | null
  }

  export type BriefMinAggregateOutputType = {
    id: number | null
    project_name: string | null
    project_type: $Enums.ProjectType | null
    project_description: string | null
    business_goals: string | null
    communication_goals: string | null
    project_kpi: string | null
    challenge: string | null
    timeline_expectations: string | null
    project_budget: string | null
    agency_scope: string | null
    mandatories: string | null
    technical_requirements: string | null
    target_audience: string | null
    internal_stakeholders: string | null
    consumer_insight: string | null
    rtb_features: string | null
    key_message: string | null
    value_proposition: string | null
    tone_of_voice: string | null
    market_competition: string | null
    inspirations: string | null
    past_communication: string | null
    touchpoints: string | null
    final_notes: string | null
    client_id: number | null
    organization_id: number | null
    status: $Enums.BriefStatus | null
    progress: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BriefMaxAggregateOutputType = {
    id: number | null
    project_name: string | null
    project_type: $Enums.ProjectType | null
    project_description: string | null
    business_goals: string | null
    communication_goals: string | null
    project_kpi: string | null
    challenge: string | null
    timeline_expectations: string | null
    project_budget: string | null
    agency_scope: string | null
    mandatories: string | null
    technical_requirements: string | null
    target_audience: string | null
    internal_stakeholders: string | null
    consumer_insight: string | null
    rtb_features: string | null
    key_message: string | null
    value_proposition: string | null
    tone_of_voice: string | null
    market_competition: string | null
    inspirations: string | null
    past_communication: string | null
    touchpoints: string | null
    final_notes: string | null
    client_id: number | null
    organization_id: number | null
    status: $Enums.BriefStatus | null
    progress: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type BriefCountAggregateOutputType = {
    id: number
    project_name: number
    project_type: number
    project_description: number
    business_goals: number
    communication_goals: number
    project_kpi: number
    challenge: number
    timeline_expectations: number
    project_budget: number
    agency_scope: number
    mandatories: number
    technical_requirements: number
    target_audience: number
    internal_stakeholders: number
    consumer_insight: number
    rtb_features: number
    key_message: number
    value_proposition: number
    tone_of_voice: number
    market_competition: number
    inspirations: number
    past_communication: number
    touchpoints: number
    final_notes: number
    attachments: number
    links: number
    client_id: number
    organization_id: number
    status: number
    progress: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type BriefAvgAggregateInputType = {
    id?: true
    client_id?: true
    organization_id?: true
    progress?: true
  }

  export type BriefSumAggregateInputType = {
    id?: true
    client_id?: true
    organization_id?: true
    progress?: true
  }

  export type BriefMinAggregateInputType = {
    id?: true
    project_name?: true
    project_type?: true
    project_description?: true
    business_goals?: true
    communication_goals?: true
    project_kpi?: true
    challenge?: true
    timeline_expectations?: true
    project_budget?: true
    agency_scope?: true
    mandatories?: true
    technical_requirements?: true
    target_audience?: true
    internal_stakeholders?: true
    consumer_insight?: true
    rtb_features?: true
    key_message?: true
    value_proposition?: true
    tone_of_voice?: true
    market_competition?: true
    inspirations?: true
    past_communication?: true
    touchpoints?: true
    final_notes?: true
    client_id?: true
    organization_id?: true
    status?: true
    progress?: true
    created_at?: true
    updated_at?: true
  }

  export type BriefMaxAggregateInputType = {
    id?: true
    project_name?: true
    project_type?: true
    project_description?: true
    business_goals?: true
    communication_goals?: true
    project_kpi?: true
    challenge?: true
    timeline_expectations?: true
    project_budget?: true
    agency_scope?: true
    mandatories?: true
    technical_requirements?: true
    target_audience?: true
    internal_stakeholders?: true
    consumer_insight?: true
    rtb_features?: true
    key_message?: true
    value_proposition?: true
    tone_of_voice?: true
    market_competition?: true
    inspirations?: true
    past_communication?: true
    touchpoints?: true
    final_notes?: true
    client_id?: true
    organization_id?: true
    status?: true
    progress?: true
    created_at?: true
    updated_at?: true
  }

  export type BriefCountAggregateInputType = {
    id?: true
    project_name?: true
    project_type?: true
    project_description?: true
    business_goals?: true
    communication_goals?: true
    project_kpi?: true
    challenge?: true
    timeline_expectations?: true
    project_budget?: true
    agency_scope?: true
    mandatories?: true
    technical_requirements?: true
    target_audience?: true
    internal_stakeholders?: true
    consumer_insight?: true
    rtb_features?: true
    key_message?: true
    value_proposition?: true
    tone_of_voice?: true
    market_competition?: true
    inspirations?: true
    past_communication?: true
    touchpoints?: true
    final_notes?: true
    attachments?: true
    links?: true
    client_id?: true
    organization_id?: true
    status?: true
    progress?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type BriefAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Brief to aggregate.
     */
    where?: BriefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Briefs to fetch.
     */
    orderBy?: BriefOrderByWithRelationInput | BriefOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BriefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Briefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Briefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Briefs
    **/
    _count?: true | BriefCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BriefAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BriefSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BriefMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BriefMaxAggregateInputType
  }

  export type GetBriefAggregateType<T extends BriefAggregateArgs> = {
        [P in keyof T & keyof AggregateBrief]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBrief[P]>
      : GetScalarType<T[P], AggregateBrief[P]>
  }




  export type BriefGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BriefWhereInput
    orderBy?: BriefOrderByWithAggregationInput | BriefOrderByWithAggregationInput[]
    by: BriefScalarFieldEnum[] | BriefScalarFieldEnum
    having?: BriefScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BriefCountAggregateInputType | true
    _avg?: BriefAvgAggregateInputType
    _sum?: BriefSumAggregateInputType
    _min?: BriefMinAggregateInputType
    _max?: BriefMaxAggregateInputType
  }

  export type BriefGroupByOutputType = {
    id: number
    project_name: string
    project_type: $Enums.ProjectType | null
    project_description: string | null
    business_goals: string | null
    communication_goals: string | null
    project_kpi: string | null
    challenge: string | null
    timeline_expectations: string | null
    project_budget: string | null
    agency_scope: string | null
    mandatories: string | null
    technical_requirements: string | null
    target_audience: string | null
    internal_stakeholders: string | null
    consumer_insight: string | null
    rtb_features: string | null
    key_message: string | null
    value_proposition: string | null
    tone_of_voice: string | null
    market_competition: string | null
    inspirations: string | null
    past_communication: string | null
    touchpoints: string | null
    final_notes: string | null
    attachments: string[]
    links: string[]
    client_id: number
    organization_id: number
    status: $Enums.BriefStatus
    progress: number
    created_at: Date
    updated_at: Date
    _count: BriefCountAggregateOutputType | null
    _avg: BriefAvgAggregateOutputType | null
    _sum: BriefSumAggregateOutputType | null
    _min: BriefMinAggregateOutputType | null
    _max: BriefMaxAggregateOutputType | null
  }

  type GetBriefGroupByPayload<T extends BriefGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BriefGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BriefGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BriefGroupByOutputType[P]>
            : GetScalarType<T[P], BriefGroupByOutputType[P]>
        }
      >
    >


  export type BriefSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_name?: boolean
    project_type?: boolean
    project_description?: boolean
    business_goals?: boolean
    communication_goals?: boolean
    project_kpi?: boolean
    challenge?: boolean
    timeline_expectations?: boolean
    project_budget?: boolean
    agency_scope?: boolean
    mandatories?: boolean
    technical_requirements?: boolean
    target_audience?: boolean
    internal_stakeholders?: boolean
    consumer_insight?: boolean
    rtb_features?: boolean
    key_message?: boolean
    value_proposition?: boolean
    tone_of_voice?: boolean
    market_competition?: boolean
    inspirations?: boolean
    past_communication?: boolean
    touchpoints?: boolean
    final_notes?: boolean
    attachments?: boolean
    links?: boolean
    client_id?: boolean
    organization_id?: boolean
    status?: boolean
    progress?: boolean
    created_at?: boolean
    updated_at?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    managers?: boolean | Brief$managersArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    _count?: boolean | BriefCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brief"]>

  export type BriefSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_name?: boolean
    project_type?: boolean
    project_description?: boolean
    business_goals?: boolean
    communication_goals?: boolean
    project_kpi?: boolean
    challenge?: boolean
    timeline_expectations?: boolean
    project_budget?: boolean
    agency_scope?: boolean
    mandatories?: boolean
    technical_requirements?: boolean
    target_audience?: boolean
    internal_stakeholders?: boolean
    consumer_insight?: boolean
    rtb_features?: boolean
    key_message?: boolean
    value_proposition?: boolean
    tone_of_voice?: boolean
    market_competition?: boolean
    inspirations?: boolean
    past_communication?: boolean
    touchpoints?: boolean
    final_notes?: boolean
    attachments?: boolean
    links?: boolean
    client_id?: boolean
    organization_id?: boolean
    status?: boolean
    progress?: boolean
    created_at?: boolean
    updated_at?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brief"]>

  export type BriefSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    project_name?: boolean
    project_type?: boolean
    project_description?: boolean
    business_goals?: boolean
    communication_goals?: boolean
    project_kpi?: boolean
    challenge?: boolean
    timeline_expectations?: boolean
    project_budget?: boolean
    agency_scope?: boolean
    mandatories?: boolean
    technical_requirements?: boolean
    target_audience?: boolean
    internal_stakeholders?: boolean
    consumer_insight?: boolean
    rtb_features?: boolean
    key_message?: boolean
    value_proposition?: boolean
    tone_of_voice?: boolean
    market_competition?: boolean
    inspirations?: boolean
    past_communication?: boolean
    touchpoints?: boolean
    final_notes?: boolean
    attachments?: boolean
    links?: boolean
    client_id?: boolean
    organization_id?: boolean
    status?: boolean
    progress?: boolean
    created_at?: boolean
    updated_at?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["brief"]>

  export type BriefSelectScalar = {
    id?: boolean
    project_name?: boolean
    project_type?: boolean
    project_description?: boolean
    business_goals?: boolean
    communication_goals?: boolean
    project_kpi?: boolean
    challenge?: boolean
    timeline_expectations?: boolean
    project_budget?: boolean
    agency_scope?: boolean
    mandatories?: boolean
    technical_requirements?: boolean
    target_audience?: boolean
    internal_stakeholders?: boolean
    consumer_insight?: boolean
    rtb_features?: boolean
    key_message?: boolean
    value_proposition?: boolean
    tone_of_voice?: boolean
    market_competition?: boolean
    inspirations?: boolean
    past_communication?: boolean
    touchpoints?: boolean
    final_notes?: boolean
    attachments?: boolean
    links?: boolean
    client_id?: boolean
    organization_id?: boolean
    status?: boolean
    progress?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type BriefOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "project_name" | "project_type" | "project_description" | "business_goals" | "communication_goals" | "project_kpi" | "challenge" | "timeline_expectations" | "project_budget" | "agency_scope" | "mandatories" | "technical_requirements" | "target_audience" | "internal_stakeholders" | "consumer_insight" | "rtb_features" | "key_message" | "value_proposition" | "tone_of_voice" | "market_competition" | "inspirations" | "past_communication" | "touchpoints" | "final_notes" | "attachments" | "links" | "client_id" | "organization_id" | "status" | "progress" | "created_at" | "updated_at", ExtArgs["result"]["brief"]>
  export type BriefInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    managers?: boolean | Brief$managersArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
    _count?: boolean | BriefCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BriefIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type BriefIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $BriefPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Brief"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      managers: Prisma.$ManagerPayload<ExtArgs>[]
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      project_name: string
      project_type: $Enums.ProjectType | null
      project_description: string | null
      business_goals: string | null
      communication_goals: string | null
      project_kpi: string | null
      challenge: string | null
      timeline_expectations: string | null
      project_budget: string | null
      agency_scope: string | null
      mandatories: string | null
      technical_requirements: string | null
      target_audience: string | null
      internal_stakeholders: string | null
      consumer_insight: string | null
      rtb_features: string | null
      key_message: string | null
      value_proposition: string | null
      tone_of_voice: string | null
      market_competition: string | null
      inspirations: string | null
      past_communication: string | null
      touchpoints: string | null
      final_notes: string | null
      attachments: string[]
      links: string[]
      client_id: number
      organization_id: number
      status: $Enums.BriefStatus
      progress: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["brief"]>
    composites: {}
  }

  type BriefGetPayload<S extends boolean | null | undefined | BriefDefaultArgs> = $Result.GetResult<Prisma.$BriefPayload, S>

  type BriefCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BriefFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BriefCountAggregateInputType | true
    }

  export interface BriefDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Brief'], meta: { name: 'Brief' } }
    /**
     * Find zero or one Brief that matches the filter.
     * @param {BriefFindUniqueArgs} args - Arguments to find a Brief
     * @example
     * // Get one Brief
     * const brief = await prisma.brief.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BriefFindUniqueArgs>(args: SelectSubset<T, BriefFindUniqueArgs<ExtArgs>>): Prisma__BriefClient<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Brief that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BriefFindUniqueOrThrowArgs} args - Arguments to find a Brief
     * @example
     * // Get one Brief
     * const brief = await prisma.brief.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BriefFindUniqueOrThrowArgs>(args: SelectSubset<T, BriefFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BriefClient<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Brief that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefFindFirstArgs} args - Arguments to find a Brief
     * @example
     * // Get one Brief
     * const brief = await prisma.brief.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BriefFindFirstArgs>(args?: SelectSubset<T, BriefFindFirstArgs<ExtArgs>>): Prisma__BriefClient<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Brief that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefFindFirstOrThrowArgs} args - Arguments to find a Brief
     * @example
     * // Get one Brief
     * const brief = await prisma.brief.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BriefFindFirstOrThrowArgs>(args?: SelectSubset<T, BriefFindFirstOrThrowArgs<ExtArgs>>): Prisma__BriefClient<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Briefs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Briefs
     * const briefs = await prisma.brief.findMany()
     * 
     * // Get first 10 Briefs
     * const briefs = await prisma.brief.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const briefWithIdOnly = await prisma.brief.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BriefFindManyArgs>(args?: SelectSubset<T, BriefFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Brief.
     * @param {BriefCreateArgs} args - Arguments to create a Brief.
     * @example
     * // Create one Brief
     * const Brief = await prisma.brief.create({
     *   data: {
     *     // ... data to create a Brief
     *   }
     * })
     * 
     */
    create<T extends BriefCreateArgs>(args: SelectSubset<T, BriefCreateArgs<ExtArgs>>): Prisma__BriefClient<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Briefs.
     * @param {BriefCreateManyArgs} args - Arguments to create many Briefs.
     * @example
     * // Create many Briefs
     * const brief = await prisma.brief.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BriefCreateManyArgs>(args?: SelectSubset<T, BriefCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Briefs and returns the data saved in the database.
     * @param {BriefCreateManyAndReturnArgs} args - Arguments to create many Briefs.
     * @example
     * // Create many Briefs
     * const brief = await prisma.brief.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Briefs and only return the `id`
     * const briefWithIdOnly = await prisma.brief.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BriefCreateManyAndReturnArgs>(args?: SelectSubset<T, BriefCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Brief.
     * @param {BriefDeleteArgs} args - Arguments to delete one Brief.
     * @example
     * // Delete one Brief
     * const Brief = await prisma.brief.delete({
     *   where: {
     *     // ... filter to delete one Brief
     *   }
     * })
     * 
     */
    delete<T extends BriefDeleteArgs>(args: SelectSubset<T, BriefDeleteArgs<ExtArgs>>): Prisma__BriefClient<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Brief.
     * @param {BriefUpdateArgs} args - Arguments to update one Brief.
     * @example
     * // Update one Brief
     * const brief = await prisma.brief.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BriefUpdateArgs>(args: SelectSubset<T, BriefUpdateArgs<ExtArgs>>): Prisma__BriefClient<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Briefs.
     * @param {BriefDeleteManyArgs} args - Arguments to filter Briefs to delete.
     * @example
     * // Delete a few Briefs
     * const { count } = await prisma.brief.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BriefDeleteManyArgs>(args?: SelectSubset<T, BriefDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Briefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Briefs
     * const brief = await prisma.brief.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BriefUpdateManyArgs>(args: SelectSubset<T, BriefUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Briefs and returns the data updated in the database.
     * @param {BriefUpdateManyAndReturnArgs} args - Arguments to update many Briefs.
     * @example
     * // Update many Briefs
     * const brief = await prisma.brief.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Briefs and only return the `id`
     * const briefWithIdOnly = await prisma.brief.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BriefUpdateManyAndReturnArgs>(args: SelectSubset<T, BriefUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Brief.
     * @param {BriefUpsertArgs} args - Arguments to update or create a Brief.
     * @example
     * // Update or create a Brief
     * const brief = await prisma.brief.upsert({
     *   create: {
     *     // ... data to create a Brief
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Brief we want to update
     *   }
     * })
     */
    upsert<T extends BriefUpsertArgs>(args: SelectSubset<T, BriefUpsertArgs<ExtArgs>>): Prisma__BriefClient<$Result.GetResult<Prisma.$BriefPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Briefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefCountArgs} args - Arguments to filter Briefs to count.
     * @example
     * // Count the number of Briefs
     * const count = await prisma.brief.count({
     *   where: {
     *     // ... the filter for the Briefs we want to count
     *   }
     * })
    **/
    count<T extends BriefCountArgs>(
      args?: Subset<T, BriefCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BriefCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Brief.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BriefAggregateArgs>(args: Subset<T, BriefAggregateArgs>): Prisma.PrismaPromise<GetBriefAggregateType<T>>

    /**
     * Group by Brief.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BriefGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BriefGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BriefGroupByArgs['orderBy'] }
        : { orderBy?: BriefGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BriefGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBriefGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Brief model
   */
  readonly fields: BriefFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Brief.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BriefClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    managers<T extends Brief$managersArgs<ExtArgs> = {}>(args?: Subset<T, Brief$managersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ManagerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Brief model
   */
  interface BriefFieldRefs {
    readonly id: FieldRef<"Brief", 'Int'>
    readonly project_name: FieldRef<"Brief", 'String'>
    readonly project_type: FieldRef<"Brief", 'ProjectType'>
    readonly project_description: FieldRef<"Brief", 'String'>
    readonly business_goals: FieldRef<"Brief", 'String'>
    readonly communication_goals: FieldRef<"Brief", 'String'>
    readonly project_kpi: FieldRef<"Brief", 'String'>
    readonly challenge: FieldRef<"Brief", 'String'>
    readonly timeline_expectations: FieldRef<"Brief", 'String'>
    readonly project_budget: FieldRef<"Brief", 'String'>
    readonly agency_scope: FieldRef<"Brief", 'String'>
    readonly mandatories: FieldRef<"Brief", 'String'>
    readonly technical_requirements: FieldRef<"Brief", 'String'>
    readonly target_audience: FieldRef<"Brief", 'String'>
    readonly internal_stakeholders: FieldRef<"Brief", 'String'>
    readonly consumer_insight: FieldRef<"Brief", 'String'>
    readonly rtb_features: FieldRef<"Brief", 'String'>
    readonly key_message: FieldRef<"Brief", 'String'>
    readonly value_proposition: FieldRef<"Brief", 'String'>
    readonly tone_of_voice: FieldRef<"Brief", 'String'>
    readonly market_competition: FieldRef<"Brief", 'String'>
    readonly inspirations: FieldRef<"Brief", 'String'>
    readonly past_communication: FieldRef<"Brief", 'String'>
    readonly touchpoints: FieldRef<"Brief", 'String'>
    readonly final_notes: FieldRef<"Brief", 'String'>
    readonly attachments: FieldRef<"Brief", 'String[]'>
    readonly links: FieldRef<"Brief", 'String[]'>
    readonly client_id: FieldRef<"Brief", 'Int'>
    readonly organization_id: FieldRef<"Brief", 'Int'>
    readonly status: FieldRef<"Brief", 'BriefStatus'>
    readonly progress: FieldRef<"Brief", 'Int'>
    readonly created_at: FieldRef<"Brief", 'DateTime'>
    readonly updated_at: FieldRef<"Brief", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Brief findUnique
   */
  export type BriefFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefInclude<ExtArgs> | null
    /**
     * Filter, which Brief to fetch.
     */
    where: BriefWhereUniqueInput
  }

  /**
   * Brief findUniqueOrThrow
   */
  export type BriefFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefInclude<ExtArgs> | null
    /**
     * Filter, which Brief to fetch.
     */
    where: BriefWhereUniqueInput
  }

  /**
   * Brief findFirst
   */
  export type BriefFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefInclude<ExtArgs> | null
    /**
     * Filter, which Brief to fetch.
     */
    where?: BriefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Briefs to fetch.
     */
    orderBy?: BriefOrderByWithRelationInput | BriefOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Briefs.
     */
    cursor?: BriefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Briefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Briefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Briefs.
     */
    distinct?: BriefScalarFieldEnum | BriefScalarFieldEnum[]
  }

  /**
   * Brief findFirstOrThrow
   */
  export type BriefFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefInclude<ExtArgs> | null
    /**
     * Filter, which Brief to fetch.
     */
    where?: BriefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Briefs to fetch.
     */
    orderBy?: BriefOrderByWithRelationInput | BriefOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Briefs.
     */
    cursor?: BriefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Briefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Briefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Briefs.
     */
    distinct?: BriefScalarFieldEnum | BriefScalarFieldEnum[]
  }

  /**
   * Brief findMany
   */
  export type BriefFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefInclude<ExtArgs> | null
    /**
     * Filter, which Briefs to fetch.
     */
    where?: BriefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Briefs to fetch.
     */
    orderBy?: BriefOrderByWithRelationInput | BriefOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Briefs.
     */
    cursor?: BriefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Briefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Briefs.
     */
    skip?: number
    distinct?: BriefScalarFieldEnum | BriefScalarFieldEnum[]
  }

  /**
   * Brief create
   */
  export type BriefCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefInclude<ExtArgs> | null
    /**
     * The data needed to create a Brief.
     */
    data: XOR<BriefCreateInput, BriefUncheckedCreateInput>
  }

  /**
   * Brief createMany
   */
  export type BriefCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Briefs.
     */
    data: BriefCreateManyInput | BriefCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Brief createManyAndReturn
   */
  export type BriefCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * The data used to create many Briefs.
     */
    data: BriefCreateManyInput | BriefCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Brief update
   */
  export type BriefUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefInclude<ExtArgs> | null
    /**
     * The data needed to update a Brief.
     */
    data: XOR<BriefUpdateInput, BriefUncheckedUpdateInput>
    /**
     * Choose, which Brief to update.
     */
    where: BriefWhereUniqueInput
  }

  /**
   * Brief updateMany
   */
  export type BriefUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Briefs.
     */
    data: XOR<BriefUpdateManyMutationInput, BriefUncheckedUpdateManyInput>
    /**
     * Filter which Briefs to update
     */
    where?: BriefWhereInput
    /**
     * Limit how many Briefs to update.
     */
    limit?: number
  }

  /**
   * Brief updateManyAndReturn
   */
  export type BriefUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * The data used to update Briefs.
     */
    data: XOR<BriefUpdateManyMutationInput, BriefUncheckedUpdateManyInput>
    /**
     * Filter which Briefs to update
     */
    where?: BriefWhereInput
    /**
     * Limit how many Briefs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Brief upsert
   */
  export type BriefUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefInclude<ExtArgs> | null
    /**
     * The filter to search for the Brief to update in case it exists.
     */
    where: BriefWhereUniqueInput
    /**
     * In case the Brief found by the `where` argument doesn't exist, create a new Brief with this data.
     */
    create: XOR<BriefCreateInput, BriefUncheckedCreateInput>
    /**
     * In case the Brief was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BriefUpdateInput, BriefUncheckedUpdateInput>
  }

  /**
   * Brief delete
   */
  export type BriefDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefInclude<ExtArgs> | null
    /**
     * Filter which Brief to delete.
     */
    where: BriefWhereUniqueInput
  }

  /**
   * Brief deleteMany
   */
  export type BriefDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Briefs to delete
     */
    where?: BriefWhereInput
    /**
     * Limit how many Briefs to delete.
     */
    limit?: number
  }

  /**
   * Brief.managers
   */
  export type Brief$managersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Manager
     */
    select?: ManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Manager
     */
    omit?: ManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ManagerInclude<ExtArgs> | null
    where?: ManagerWhereInput
    orderBy?: ManagerOrderByWithRelationInput | ManagerOrderByWithRelationInput[]
    cursor?: ManagerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ManagerScalarFieldEnum | ManagerScalarFieldEnum[]
  }

  /**
   * Brief without action
   */
  export type BriefDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Brief
     */
    select?: BriefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Brief
     */
    omit?: BriefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BriefInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    ai_support: 'ai_support',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const ManagerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    title: 'title',
    avatar: 'avatar',
    email: 'email',
    organization_id: 'organization_id',
    status: 'status',
    role: 'role',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ManagerScalarFieldEnum = (typeof ManagerScalarFieldEnum)[keyof typeof ManagerScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    name: 'name',
    title: 'title',
    avatar: 'avatar',
    email: 'email',
    organization_id: 'organization_id',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const BriefScalarFieldEnum: {
    id: 'id',
    project_name: 'project_name',
    project_type: 'project_type',
    project_description: 'project_description',
    business_goals: 'business_goals',
    communication_goals: 'communication_goals',
    project_kpi: 'project_kpi',
    challenge: 'challenge',
    timeline_expectations: 'timeline_expectations',
    project_budget: 'project_budget',
    agency_scope: 'agency_scope',
    mandatories: 'mandatories',
    technical_requirements: 'technical_requirements',
    target_audience: 'target_audience',
    internal_stakeholders: 'internal_stakeholders',
    consumer_insight: 'consumer_insight',
    rtb_features: 'rtb_features',
    key_message: 'key_message',
    value_proposition: 'value_proposition',
    tone_of_voice: 'tone_of_voice',
    market_competition: 'market_competition',
    inspirations: 'inspirations',
    past_communication: 'past_communication',
    touchpoints: 'touchpoints',
    final_notes: 'final_notes',
    attachments: 'attachments',
    links: 'links',
    client_id: 'client_id',
    organization_id: 'organization_id',
    status: 'status',
    progress: 'progress',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type BriefScalarFieldEnum = (typeof BriefScalarFieldEnum)[keyof typeof BriefScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ManagerStatus'
   */
  export type EnumManagerStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ManagerStatus'>
    


  /**
   * Reference to a field of type 'ManagerStatus[]'
   */
  export type ListEnumManagerStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ManagerStatus[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'ClientStatus'
   */
  export type EnumClientStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClientStatus'>
    


  /**
   * Reference to a field of type 'ClientStatus[]'
   */
  export type ListEnumClientStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClientStatus[]'>
    


  /**
   * Reference to a field of type 'ProjectType'
   */
  export type EnumProjectTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectType'>
    


  /**
   * Reference to a field of type 'ProjectType[]'
   */
  export type ListEnumProjectTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProjectType[]'>
    


  /**
   * Reference to a field of type 'BriefStatus'
   */
  export type EnumBriefStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BriefStatus'>
    


  /**
   * Reference to a field of type 'BriefStatus[]'
   */
  export type ListEnumBriefStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BriefStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: IntFilter<"Organization"> | number
    name?: StringFilter<"Organization"> | string
    ai_support?: BoolFilter<"Organization"> | boolean
    created_at?: DateTimeFilter<"Organization"> | Date | string
    updated_at?: DateTimeFilter<"Organization"> | Date | string
    managers?: ManagerListRelationFilter
    clients?: ClientListRelationFilter
    briefs?: BriefListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    ai_support?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    managers?: ManagerOrderByRelationAggregateInput
    clients?: ClientOrderByRelationAggregateInput
    briefs?: BriefOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    ai_support?: BoolFilter<"Organization"> | boolean
    created_at?: DateTimeFilter<"Organization"> | Date | string
    updated_at?: DateTimeFilter<"Organization"> | Date | string
    managers?: ManagerListRelationFilter
    clients?: ClientListRelationFilter
    briefs?: BriefListRelationFilter
  }, "id">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    ai_support?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _avg?: OrganizationAvgOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
    _sum?: OrganizationSumOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Organization"> | number
    name?: StringWithAggregatesFilter<"Organization"> | string
    ai_support?: BoolWithAggregatesFilter<"Organization"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
  }

  export type ManagerWhereInput = {
    AND?: ManagerWhereInput | ManagerWhereInput[]
    OR?: ManagerWhereInput[]
    NOT?: ManagerWhereInput | ManagerWhereInput[]
    id?: IntFilter<"Manager"> | number
    name?: StringFilter<"Manager"> | string
    title?: StringNullableFilter<"Manager"> | string | null
    avatar?: StringNullableFilter<"Manager"> | string | null
    email?: StringNullableFilter<"Manager"> | string | null
    organization_id?: IntNullableFilter<"Manager"> | number | null
    status?: EnumManagerStatusFilter<"Manager"> | $Enums.ManagerStatus
    role?: EnumUserRoleFilter<"Manager"> | $Enums.UserRole
    created_at?: DateTimeFilter<"Manager"> | Date | string
    updated_at?: DateTimeFilter<"Manager"> | Date | string
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    briefs?: BriefListRelationFilter
  }

  export type ManagerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    organization_id?: SortOrderInput | SortOrder
    status?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    briefs?: BriefOrderByRelationAggregateInput
  }

  export type ManagerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: ManagerWhereInput | ManagerWhereInput[]
    OR?: ManagerWhereInput[]
    NOT?: ManagerWhereInput | ManagerWhereInput[]
    name?: StringFilter<"Manager"> | string
    title?: StringNullableFilter<"Manager"> | string | null
    avatar?: StringNullableFilter<"Manager"> | string | null
    organization_id?: IntNullableFilter<"Manager"> | number | null
    status?: EnumManagerStatusFilter<"Manager"> | $Enums.ManagerStatus
    role?: EnumUserRoleFilter<"Manager"> | $Enums.UserRole
    created_at?: DateTimeFilter<"Manager"> | Date | string
    updated_at?: DateTimeFilter<"Manager"> | Date | string
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    briefs?: BriefListRelationFilter
  }, "id" | "email">

  export type ManagerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    organization_id?: SortOrderInput | SortOrder
    status?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ManagerCountOrderByAggregateInput
    _avg?: ManagerAvgOrderByAggregateInput
    _max?: ManagerMaxOrderByAggregateInput
    _min?: ManagerMinOrderByAggregateInput
    _sum?: ManagerSumOrderByAggregateInput
  }

  export type ManagerScalarWhereWithAggregatesInput = {
    AND?: ManagerScalarWhereWithAggregatesInput | ManagerScalarWhereWithAggregatesInput[]
    OR?: ManagerScalarWhereWithAggregatesInput[]
    NOT?: ManagerScalarWhereWithAggregatesInput | ManagerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Manager"> | number
    name?: StringWithAggregatesFilter<"Manager"> | string
    title?: StringNullableWithAggregatesFilter<"Manager"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"Manager"> | string | null
    email?: StringNullableWithAggregatesFilter<"Manager"> | string | null
    organization_id?: IntNullableWithAggregatesFilter<"Manager"> | number | null
    status?: EnumManagerStatusWithAggregatesFilter<"Manager"> | $Enums.ManagerStatus
    role?: EnumUserRoleWithAggregatesFilter<"Manager"> | $Enums.UserRole
    created_at?: DateTimeWithAggregatesFilter<"Manager"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Manager"> | Date | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: IntFilter<"Client"> | number
    name?: StringFilter<"Client"> | string
    title?: StringNullableFilter<"Client"> | string | null
    avatar?: StringNullableFilter<"Client"> | string | null
    email?: StringNullableFilter<"Client"> | string | null
    organization_id?: IntNullableFilter<"Client"> | number | null
    status?: EnumClientStatusFilter<"Client"> | $Enums.ClientStatus
    created_at?: DateTimeFilter<"Client"> | Date | string
    updated_at?: DateTimeFilter<"Client"> | Date | string
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    briefs?: BriefListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    organization_id?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
    briefs?: BriefOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    name?: StringFilter<"Client"> | string
    title?: StringNullableFilter<"Client"> | string | null
    avatar?: StringNullableFilter<"Client"> | string | null
    organization_id?: IntNullableFilter<"Client"> | number | null
    status?: EnumClientStatusFilter<"Client"> | $Enums.ClientStatus
    created_at?: DateTimeFilter<"Client"> | Date | string
    updated_at?: DateTimeFilter<"Client"> | Date | string
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    briefs?: BriefListRelationFilter
  }, "id" | "email">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    organization_id?: SortOrderInput | SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _avg?: ClientAvgOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
    _sum?: ClientSumOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Client"> | number
    name?: StringWithAggregatesFilter<"Client"> | string
    title?: StringNullableWithAggregatesFilter<"Client"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"Client"> | string | null
    email?: StringNullableWithAggregatesFilter<"Client"> | string | null
    organization_id?: IntNullableWithAggregatesFilter<"Client"> | number | null
    status?: EnumClientStatusWithAggregatesFilter<"Client"> | $Enums.ClientStatus
    created_at?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type BriefWhereInput = {
    AND?: BriefWhereInput | BriefWhereInput[]
    OR?: BriefWhereInput[]
    NOT?: BriefWhereInput | BriefWhereInput[]
    id?: IntFilter<"Brief"> | number
    project_name?: StringFilter<"Brief"> | string
    project_type?: EnumProjectTypeNullableFilter<"Brief"> | $Enums.ProjectType | null
    project_description?: StringNullableFilter<"Brief"> | string | null
    business_goals?: StringNullableFilter<"Brief"> | string | null
    communication_goals?: StringNullableFilter<"Brief"> | string | null
    project_kpi?: StringNullableFilter<"Brief"> | string | null
    challenge?: StringNullableFilter<"Brief"> | string | null
    timeline_expectations?: StringNullableFilter<"Brief"> | string | null
    project_budget?: StringNullableFilter<"Brief"> | string | null
    agency_scope?: StringNullableFilter<"Brief"> | string | null
    mandatories?: StringNullableFilter<"Brief"> | string | null
    technical_requirements?: StringNullableFilter<"Brief"> | string | null
    target_audience?: StringNullableFilter<"Brief"> | string | null
    internal_stakeholders?: StringNullableFilter<"Brief"> | string | null
    consumer_insight?: StringNullableFilter<"Brief"> | string | null
    rtb_features?: StringNullableFilter<"Brief"> | string | null
    key_message?: StringNullableFilter<"Brief"> | string | null
    value_proposition?: StringNullableFilter<"Brief"> | string | null
    tone_of_voice?: StringNullableFilter<"Brief"> | string | null
    market_competition?: StringNullableFilter<"Brief"> | string | null
    inspirations?: StringNullableFilter<"Brief"> | string | null
    past_communication?: StringNullableFilter<"Brief"> | string | null
    touchpoints?: StringNullableFilter<"Brief"> | string | null
    final_notes?: StringNullableFilter<"Brief"> | string | null
    attachments?: StringNullableListFilter<"Brief">
    links?: StringNullableListFilter<"Brief">
    client_id?: IntFilter<"Brief"> | number
    organization_id?: IntFilter<"Brief"> | number
    status?: EnumBriefStatusFilter<"Brief"> | $Enums.BriefStatus
    progress?: IntFilter<"Brief"> | number
    created_at?: DateTimeFilter<"Brief"> | Date | string
    updated_at?: DateTimeFilter<"Brief"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    managers?: ManagerListRelationFilter
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }

  export type BriefOrderByWithRelationInput = {
    id?: SortOrder
    project_name?: SortOrder
    project_type?: SortOrderInput | SortOrder
    project_description?: SortOrderInput | SortOrder
    business_goals?: SortOrderInput | SortOrder
    communication_goals?: SortOrderInput | SortOrder
    project_kpi?: SortOrderInput | SortOrder
    challenge?: SortOrderInput | SortOrder
    timeline_expectations?: SortOrderInput | SortOrder
    project_budget?: SortOrderInput | SortOrder
    agency_scope?: SortOrderInput | SortOrder
    mandatories?: SortOrderInput | SortOrder
    technical_requirements?: SortOrderInput | SortOrder
    target_audience?: SortOrderInput | SortOrder
    internal_stakeholders?: SortOrderInput | SortOrder
    consumer_insight?: SortOrderInput | SortOrder
    rtb_features?: SortOrderInput | SortOrder
    key_message?: SortOrderInput | SortOrder
    value_proposition?: SortOrderInput | SortOrder
    tone_of_voice?: SortOrderInput | SortOrder
    market_competition?: SortOrderInput | SortOrder
    inspirations?: SortOrderInput | SortOrder
    past_communication?: SortOrderInput | SortOrder
    touchpoints?: SortOrderInput | SortOrder
    final_notes?: SortOrderInput | SortOrder
    attachments?: SortOrder
    links?: SortOrder
    client_id?: SortOrder
    organization_id?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    client?: ClientOrderByWithRelationInput
    managers?: ManagerOrderByRelationAggregateInput
    organization?: OrganizationOrderByWithRelationInput
  }

  export type BriefWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BriefWhereInput | BriefWhereInput[]
    OR?: BriefWhereInput[]
    NOT?: BriefWhereInput | BriefWhereInput[]
    project_name?: StringFilter<"Brief"> | string
    project_type?: EnumProjectTypeNullableFilter<"Brief"> | $Enums.ProjectType | null
    project_description?: StringNullableFilter<"Brief"> | string | null
    business_goals?: StringNullableFilter<"Brief"> | string | null
    communication_goals?: StringNullableFilter<"Brief"> | string | null
    project_kpi?: StringNullableFilter<"Brief"> | string | null
    challenge?: StringNullableFilter<"Brief"> | string | null
    timeline_expectations?: StringNullableFilter<"Brief"> | string | null
    project_budget?: StringNullableFilter<"Brief"> | string | null
    agency_scope?: StringNullableFilter<"Brief"> | string | null
    mandatories?: StringNullableFilter<"Brief"> | string | null
    technical_requirements?: StringNullableFilter<"Brief"> | string | null
    target_audience?: StringNullableFilter<"Brief"> | string | null
    internal_stakeholders?: StringNullableFilter<"Brief"> | string | null
    consumer_insight?: StringNullableFilter<"Brief"> | string | null
    rtb_features?: StringNullableFilter<"Brief"> | string | null
    key_message?: StringNullableFilter<"Brief"> | string | null
    value_proposition?: StringNullableFilter<"Brief"> | string | null
    tone_of_voice?: StringNullableFilter<"Brief"> | string | null
    market_competition?: StringNullableFilter<"Brief"> | string | null
    inspirations?: StringNullableFilter<"Brief"> | string | null
    past_communication?: StringNullableFilter<"Brief"> | string | null
    touchpoints?: StringNullableFilter<"Brief"> | string | null
    final_notes?: StringNullableFilter<"Brief"> | string | null
    attachments?: StringNullableListFilter<"Brief">
    links?: StringNullableListFilter<"Brief">
    client_id?: IntFilter<"Brief"> | number
    organization_id?: IntFilter<"Brief"> | number
    status?: EnumBriefStatusFilter<"Brief"> | $Enums.BriefStatus
    progress?: IntFilter<"Brief"> | number
    created_at?: DateTimeFilter<"Brief"> | Date | string
    updated_at?: DateTimeFilter<"Brief"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    managers?: ManagerListRelationFilter
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }, "id">

  export type BriefOrderByWithAggregationInput = {
    id?: SortOrder
    project_name?: SortOrder
    project_type?: SortOrderInput | SortOrder
    project_description?: SortOrderInput | SortOrder
    business_goals?: SortOrderInput | SortOrder
    communication_goals?: SortOrderInput | SortOrder
    project_kpi?: SortOrderInput | SortOrder
    challenge?: SortOrderInput | SortOrder
    timeline_expectations?: SortOrderInput | SortOrder
    project_budget?: SortOrderInput | SortOrder
    agency_scope?: SortOrderInput | SortOrder
    mandatories?: SortOrderInput | SortOrder
    technical_requirements?: SortOrderInput | SortOrder
    target_audience?: SortOrderInput | SortOrder
    internal_stakeholders?: SortOrderInput | SortOrder
    consumer_insight?: SortOrderInput | SortOrder
    rtb_features?: SortOrderInput | SortOrder
    key_message?: SortOrderInput | SortOrder
    value_proposition?: SortOrderInput | SortOrder
    tone_of_voice?: SortOrderInput | SortOrder
    market_competition?: SortOrderInput | SortOrder
    inspirations?: SortOrderInput | SortOrder
    past_communication?: SortOrderInput | SortOrder
    touchpoints?: SortOrderInput | SortOrder
    final_notes?: SortOrderInput | SortOrder
    attachments?: SortOrder
    links?: SortOrder
    client_id?: SortOrder
    organization_id?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: BriefCountOrderByAggregateInput
    _avg?: BriefAvgOrderByAggregateInput
    _max?: BriefMaxOrderByAggregateInput
    _min?: BriefMinOrderByAggregateInput
    _sum?: BriefSumOrderByAggregateInput
  }

  export type BriefScalarWhereWithAggregatesInput = {
    AND?: BriefScalarWhereWithAggregatesInput | BriefScalarWhereWithAggregatesInput[]
    OR?: BriefScalarWhereWithAggregatesInput[]
    NOT?: BriefScalarWhereWithAggregatesInput | BriefScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Brief"> | number
    project_name?: StringWithAggregatesFilter<"Brief"> | string
    project_type?: EnumProjectTypeNullableWithAggregatesFilter<"Brief"> | $Enums.ProjectType | null
    project_description?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    business_goals?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    communication_goals?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    project_kpi?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    challenge?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    timeline_expectations?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    project_budget?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    agency_scope?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    mandatories?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    technical_requirements?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    target_audience?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    internal_stakeholders?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    consumer_insight?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    rtb_features?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    key_message?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    value_proposition?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    tone_of_voice?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    market_competition?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    inspirations?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    past_communication?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    touchpoints?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    final_notes?: StringNullableWithAggregatesFilter<"Brief"> | string | null
    attachments?: StringNullableListFilter<"Brief">
    links?: StringNullableListFilter<"Brief">
    client_id?: IntWithAggregatesFilter<"Brief"> | number
    organization_id?: IntWithAggregatesFilter<"Brief"> | number
    status?: EnumBriefStatusWithAggregatesFilter<"Brief"> | $Enums.BriefStatus
    progress?: IntWithAggregatesFilter<"Brief"> | number
    created_at?: DateTimeWithAggregatesFilter<"Brief"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Brief"> | Date | string
  }

  export type OrganizationCreateInput = {
    name: string
    ai_support?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    managers?: ManagerCreateNestedManyWithoutOrganizationInput
    clients?: ClientCreateNestedManyWithoutOrganizationInput
    briefs?: BriefCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: number
    name: string
    ai_support?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    managers?: ManagerUncheckedCreateNestedManyWithoutOrganizationInput
    clients?: ClientUncheckedCreateNestedManyWithoutOrganizationInput
    briefs?: BriefUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    ai_support?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    managers?: ManagerUpdateManyWithoutOrganizationNestedInput
    clients?: ClientUpdateManyWithoutOrganizationNestedInput
    briefs?: BriefUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ai_support?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    managers?: ManagerUncheckedUpdateManyWithoutOrganizationNestedInput
    clients?: ClientUncheckedUpdateManyWithoutOrganizationNestedInput
    briefs?: BriefUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: number
    name: string
    ai_support?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OrganizationUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    ai_support?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ai_support?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManagerCreateInput = {
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    status?: $Enums.ManagerStatus
    role?: $Enums.UserRole
    created_at?: Date | string
    updated_at?: Date | string
    organization?: OrganizationCreateNestedOneWithoutManagersInput
    briefs?: BriefCreateNestedManyWithoutManagersInput
  }

  export type ManagerUncheckedCreateInput = {
    id?: number
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    organization_id?: number | null
    status?: $Enums.ManagerStatus
    role?: $Enums.UserRole
    created_at?: Date | string
    updated_at?: Date | string
    briefs?: BriefUncheckedCreateNestedManyWithoutManagersInput
  }

  export type ManagerUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumManagerStatusFieldUpdateOperationsInput | $Enums.ManagerStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutManagersNestedInput
    briefs?: BriefUpdateManyWithoutManagersNestedInput
  }

  export type ManagerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    organization_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumManagerStatusFieldUpdateOperationsInput | $Enums.ManagerStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    briefs?: BriefUncheckedUpdateManyWithoutManagersNestedInput
  }

  export type ManagerCreateManyInput = {
    id?: number
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    organization_id?: number | null
    status?: $Enums.ManagerStatus
    role?: $Enums.UserRole
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ManagerUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumManagerStatusFieldUpdateOperationsInput | $Enums.ManagerStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManagerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    organization_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumManagerStatusFieldUpdateOperationsInput | $Enums.ManagerStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateInput = {
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    status?: $Enums.ClientStatus
    created_at?: Date | string
    updated_at?: Date | string
    organization?: OrganizationCreateNestedOneWithoutClientsInput
    briefs?: BriefCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: number
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    organization_id?: number | null
    status?: $Enums.ClientStatus
    created_at?: Date | string
    updated_at?: Date | string
    briefs?: BriefUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClientStatusFieldUpdateOperationsInput | $Enums.ClientStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutClientsNestedInput
    briefs?: BriefUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    organization_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClientStatusFieldUpdateOperationsInput | $Enums.ClientStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    briefs?: BriefUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: number
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    organization_id?: number | null
    status?: $Enums.ClientStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClientStatusFieldUpdateOperationsInput | $Enums.ClientStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    organization_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClientStatusFieldUpdateOperationsInput | $Enums.ClientStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BriefCreateInput = {
    project_name: string
    project_type?: $Enums.ProjectType | null
    project_description?: string | null
    business_goals?: string | null
    communication_goals?: string | null
    project_kpi?: string | null
    challenge?: string | null
    timeline_expectations?: string | null
    project_budget?: string | null
    agency_scope?: string | null
    mandatories?: string | null
    technical_requirements?: string | null
    target_audience?: string | null
    internal_stakeholders?: string | null
    consumer_insight?: string | null
    rtb_features?: string | null
    key_message?: string | null
    value_proposition?: string | null
    tone_of_voice?: string | null
    market_competition?: string | null
    inspirations?: string | null
    past_communication?: string | null
    touchpoints?: string | null
    final_notes?: string | null
    attachments?: BriefCreateattachmentsInput | string[]
    links?: BriefCreatelinksInput | string[]
    status?: $Enums.BriefStatus
    progress?: number
    created_at?: Date | string
    updated_at?: Date | string
    client: ClientCreateNestedOneWithoutBriefsInput
    managers?: ManagerCreateNestedManyWithoutBriefsInput
    organization: OrganizationCreateNestedOneWithoutBriefsInput
  }

  export type BriefUncheckedCreateInput = {
    id?: number
    project_name: string
    project_type?: $Enums.ProjectType | null
    project_description?: string | null
    business_goals?: string | null
    communication_goals?: string | null
    project_kpi?: string | null
    challenge?: string | null
    timeline_expectations?: string | null
    project_budget?: string | null
    agency_scope?: string | null
    mandatories?: string | null
    technical_requirements?: string | null
    target_audience?: string | null
    internal_stakeholders?: string | null
    consumer_insight?: string | null
    rtb_features?: string | null
    key_message?: string | null
    value_proposition?: string | null
    tone_of_voice?: string | null
    market_competition?: string | null
    inspirations?: string | null
    past_communication?: string | null
    touchpoints?: string | null
    final_notes?: string | null
    attachments?: BriefCreateattachmentsInput | string[]
    links?: BriefCreatelinksInput | string[]
    client_id: number
    organization_id: number
    status?: $Enums.BriefStatus
    progress?: number
    created_at?: Date | string
    updated_at?: Date | string
    managers?: ManagerUncheckedCreateNestedManyWithoutBriefsInput
  }

  export type BriefUpdateInput = {
    project_name?: StringFieldUpdateOperationsInput | string
    project_type?: NullableEnumProjectTypeFieldUpdateOperationsInput | $Enums.ProjectType | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    business_goals?: NullableStringFieldUpdateOperationsInput | string | null
    communication_goals?: NullableStringFieldUpdateOperationsInput | string | null
    project_kpi?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    timeline_expectations?: NullableStringFieldUpdateOperationsInput | string | null
    project_budget?: NullableStringFieldUpdateOperationsInput | string | null
    agency_scope?: NullableStringFieldUpdateOperationsInput | string | null
    mandatories?: NullableStringFieldUpdateOperationsInput | string | null
    technical_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    target_audience?: NullableStringFieldUpdateOperationsInput | string | null
    internal_stakeholders?: NullableStringFieldUpdateOperationsInput | string | null
    consumer_insight?: NullableStringFieldUpdateOperationsInput | string | null
    rtb_features?: NullableStringFieldUpdateOperationsInput | string | null
    key_message?: NullableStringFieldUpdateOperationsInput | string | null
    value_proposition?: NullableStringFieldUpdateOperationsInput | string | null
    tone_of_voice?: NullableStringFieldUpdateOperationsInput | string | null
    market_competition?: NullableStringFieldUpdateOperationsInput | string | null
    inspirations?: NullableStringFieldUpdateOperationsInput | string | null
    past_communication?: NullableStringFieldUpdateOperationsInput | string | null
    touchpoints?: NullableStringFieldUpdateOperationsInput | string | null
    final_notes?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: BriefUpdateattachmentsInput | string[]
    links?: BriefUpdatelinksInput | string[]
    status?: EnumBriefStatusFieldUpdateOperationsInput | $Enums.BriefStatus
    progress?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutBriefsNestedInput
    managers?: ManagerUpdateManyWithoutBriefsNestedInput
    organization?: OrganizationUpdateOneRequiredWithoutBriefsNestedInput
  }

  export type BriefUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    project_name?: StringFieldUpdateOperationsInput | string
    project_type?: NullableEnumProjectTypeFieldUpdateOperationsInput | $Enums.ProjectType | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    business_goals?: NullableStringFieldUpdateOperationsInput | string | null
    communication_goals?: NullableStringFieldUpdateOperationsInput | string | null
    project_kpi?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    timeline_expectations?: NullableStringFieldUpdateOperationsInput | string | null
    project_budget?: NullableStringFieldUpdateOperationsInput | string | null
    agency_scope?: NullableStringFieldUpdateOperationsInput | string | null
    mandatories?: NullableStringFieldUpdateOperationsInput | string | null
    technical_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    target_audience?: NullableStringFieldUpdateOperationsInput | string | null
    internal_stakeholders?: NullableStringFieldUpdateOperationsInput | string | null
    consumer_insight?: NullableStringFieldUpdateOperationsInput | string | null
    rtb_features?: NullableStringFieldUpdateOperationsInput | string | null
    key_message?: NullableStringFieldUpdateOperationsInput | string | null
    value_proposition?: NullableStringFieldUpdateOperationsInput | string | null
    tone_of_voice?: NullableStringFieldUpdateOperationsInput | string | null
    market_competition?: NullableStringFieldUpdateOperationsInput | string | null
    inspirations?: NullableStringFieldUpdateOperationsInput | string | null
    past_communication?: NullableStringFieldUpdateOperationsInput | string | null
    touchpoints?: NullableStringFieldUpdateOperationsInput | string | null
    final_notes?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: BriefUpdateattachmentsInput | string[]
    links?: BriefUpdatelinksInput | string[]
    client_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    status?: EnumBriefStatusFieldUpdateOperationsInput | $Enums.BriefStatus
    progress?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    managers?: ManagerUncheckedUpdateManyWithoutBriefsNestedInput
  }

  export type BriefCreateManyInput = {
    id?: number
    project_name: string
    project_type?: $Enums.ProjectType | null
    project_description?: string | null
    business_goals?: string | null
    communication_goals?: string | null
    project_kpi?: string | null
    challenge?: string | null
    timeline_expectations?: string | null
    project_budget?: string | null
    agency_scope?: string | null
    mandatories?: string | null
    technical_requirements?: string | null
    target_audience?: string | null
    internal_stakeholders?: string | null
    consumer_insight?: string | null
    rtb_features?: string | null
    key_message?: string | null
    value_proposition?: string | null
    tone_of_voice?: string | null
    market_competition?: string | null
    inspirations?: string | null
    past_communication?: string | null
    touchpoints?: string | null
    final_notes?: string | null
    attachments?: BriefCreateattachmentsInput | string[]
    links?: BriefCreatelinksInput | string[]
    client_id: number
    organization_id: number
    status?: $Enums.BriefStatus
    progress?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BriefUpdateManyMutationInput = {
    project_name?: StringFieldUpdateOperationsInput | string
    project_type?: NullableEnumProjectTypeFieldUpdateOperationsInput | $Enums.ProjectType | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    business_goals?: NullableStringFieldUpdateOperationsInput | string | null
    communication_goals?: NullableStringFieldUpdateOperationsInput | string | null
    project_kpi?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    timeline_expectations?: NullableStringFieldUpdateOperationsInput | string | null
    project_budget?: NullableStringFieldUpdateOperationsInput | string | null
    agency_scope?: NullableStringFieldUpdateOperationsInput | string | null
    mandatories?: NullableStringFieldUpdateOperationsInput | string | null
    technical_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    target_audience?: NullableStringFieldUpdateOperationsInput | string | null
    internal_stakeholders?: NullableStringFieldUpdateOperationsInput | string | null
    consumer_insight?: NullableStringFieldUpdateOperationsInput | string | null
    rtb_features?: NullableStringFieldUpdateOperationsInput | string | null
    key_message?: NullableStringFieldUpdateOperationsInput | string | null
    value_proposition?: NullableStringFieldUpdateOperationsInput | string | null
    tone_of_voice?: NullableStringFieldUpdateOperationsInput | string | null
    market_competition?: NullableStringFieldUpdateOperationsInput | string | null
    inspirations?: NullableStringFieldUpdateOperationsInput | string | null
    past_communication?: NullableStringFieldUpdateOperationsInput | string | null
    touchpoints?: NullableStringFieldUpdateOperationsInput | string | null
    final_notes?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: BriefUpdateattachmentsInput | string[]
    links?: BriefUpdatelinksInput | string[]
    status?: EnumBriefStatusFieldUpdateOperationsInput | $Enums.BriefStatus
    progress?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BriefUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    project_name?: StringFieldUpdateOperationsInput | string
    project_type?: NullableEnumProjectTypeFieldUpdateOperationsInput | $Enums.ProjectType | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    business_goals?: NullableStringFieldUpdateOperationsInput | string | null
    communication_goals?: NullableStringFieldUpdateOperationsInput | string | null
    project_kpi?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    timeline_expectations?: NullableStringFieldUpdateOperationsInput | string | null
    project_budget?: NullableStringFieldUpdateOperationsInput | string | null
    agency_scope?: NullableStringFieldUpdateOperationsInput | string | null
    mandatories?: NullableStringFieldUpdateOperationsInput | string | null
    technical_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    target_audience?: NullableStringFieldUpdateOperationsInput | string | null
    internal_stakeholders?: NullableStringFieldUpdateOperationsInput | string | null
    consumer_insight?: NullableStringFieldUpdateOperationsInput | string | null
    rtb_features?: NullableStringFieldUpdateOperationsInput | string | null
    key_message?: NullableStringFieldUpdateOperationsInput | string | null
    value_proposition?: NullableStringFieldUpdateOperationsInput | string | null
    tone_of_voice?: NullableStringFieldUpdateOperationsInput | string | null
    market_competition?: NullableStringFieldUpdateOperationsInput | string | null
    inspirations?: NullableStringFieldUpdateOperationsInput | string | null
    past_communication?: NullableStringFieldUpdateOperationsInput | string | null
    touchpoints?: NullableStringFieldUpdateOperationsInput | string | null
    final_notes?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: BriefUpdateattachmentsInput | string[]
    links?: BriefUpdatelinksInput | string[]
    client_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    status?: EnumBriefStatusFieldUpdateOperationsInput | $Enums.BriefStatus
    progress?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ManagerListRelationFilter = {
    every?: ManagerWhereInput
    some?: ManagerWhereInput
    none?: ManagerWhereInput
  }

  export type ClientListRelationFilter = {
    every?: ClientWhereInput
    some?: ClientWhereInput
    none?: ClientWhereInput
  }

  export type BriefListRelationFilter = {
    every?: BriefWhereInput
    some?: BriefWhereInput
    none?: BriefWhereInput
  }

  export type ManagerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BriefOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ai_support?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OrganizationAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ai_support?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    ai_support?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OrganizationSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumManagerStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ManagerStatus | EnumManagerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ManagerStatus[] | ListEnumManagerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ManagerStatus[] | ListEnumManagerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumManagerStatusFilter<$PrismaModel> | $Enums.ManagerStatus
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type OrganizationNullableScalarRelationFilter = {
    is?: OrganizationWhereInput | null
    isNot?: OrganizationWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ManagerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    organization_id?: SortOrder
    status?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ManagerAvgOrderByAggregateInput = {
    id?: SortOrder
    organization_id?: SortOrder
  }

  export type ManagerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    organization_id?: SortOrder
    status?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ManagerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    organization_id?: SortOrder
    status?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ManagerSumOrderByAggregateInput = {
    id?: SortOrder
    organization_id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumManagerStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ManagerStatus | EnumManagerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ManagerStatus[] | ListEnumManagerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ManagerStatus[] | ListEnumManagerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumManagerStatusWithAggregatesFilter<$PrismaModel> | $Enums.ManagerStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumManagerStatusFilter<$PrismaModel>
    _max?: NestedEnumManagerStatusFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type EnumClientStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClientStatus | EnumClientStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClientStatus[] | ListEnumClientStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClientStatus[] | ListEnumClientStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClientStatusFilter<$PrismaModel> | $Enums.ClientStatus
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    organization_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ClientAvgOrderByAggregateInput = {
    id?: SortOrder
    organization_id?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    organization_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    title?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    organization_id?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ClientSumOrderByAggregateInput = {
    id?: SortOrder
    organization_id?: SortOrder
  }

  export type EnumClientStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClientStatus | EnumClientStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClientStatus[] | ListEnumClientStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClientStatus[] | ListEnumClientStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClientStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClientStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClientStatusFilter<$PrismaModel>
    _max?: NestedEnumClientStatusFilter<$PrismaModel>
  }

  export type EnumProjectTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectType | EnumProjectTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ProjectType[] | ListEnumProjectTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ProjectType[] | ListEnumProjectTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumProjectTypeNullableFilter<$PrismaModel> | $Enums.ProjectType | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumBriefStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BriefStatus | EnumBriefStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BriefStatus[] | ListEnumBriefStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BriefStatus[] | ListEnumBriefStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBriefStatusFilter<$PrismaModel> | $Enums.BriefStatus
  }

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type BriefCountOrderByAggregateInput = {
    id?: SortOrder
    project_name?: SortOrder
    project_type?: SortOrder
    project_description?: SortOrder
    business_goals?: SortOrder
    communication_goals?: SortOrder
    project_kpi?: SortOrder
    challenge?: SortOrder
    timeline_expectations?: SortOrder
    project_budget?: SortOrder
    agency_scope?: SortOrder
    mandatories?: SortOrder
    technical_requirements?: SortOrder
    target_audience?: SortOrder
    internal_stakeholders?: SortOrder
    consumer_insight?: SortOrder
    rtb_features?: SortOrder
    key_message?: SortOrder
    value_proposition?: SortOrder
    tone_of_voice?: SortOrder
    market_competition?: SortOrder
    inspirations?: SortOrder
    past_communication?: SortOrder
    touchpoints?: SortOrder
    final_notes?: SortOrder
    attachments?: SortOrder
    links?: SortOrder
    client_id?: SortOrder
    organization_id?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BriefAvgOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    organization_id?: SortOrder
    progress?: SortOrder
  }

  export type BriefMaxOrderByAggregateInput = {
    id?: SortOrder
    project_name?: SortOrder
    project_type?: SortOrder
    project_description?: SortOrder
    business_goals?: SortOrder
    communication_goals?: SortOrder
    project_kpi?: SortOrder
    challenge?: SortOrder
    timeline_expectations?: SortOrder
    project_budget?: SortOrder
    agency_scope?: SortOrder
    mandatories?: SortOrder
    technical_requirements?: SortOrder
    target_audience?: SortOrder
    internal_stakeholders?: SortOrder
    consumer_insight?: SortOrder
    rtb_features?: SortOrder
    key_message?: SortOrder
    value_proposition?: SortOrder
    tone_of_voice?: SortOrder
    market_competition?: SortOrder
    inspirations?: SortOrder
    past_communication?: SortOrder
    touchpoints?: SortOrder
    final_notes?: SortOrder
    client_id?: SortOrder
    organization_id?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BriefMinOrderByAggregateInput = {
    id?: SortOrder
    project_name?: SortOrder
    project_type?: SortOrder
    project_description?: SortOrder
    business_goals?: SortOrder
    communication_goals?: SortOrder
    project_kpi?: SortOrder
    challenge?: SortOrder
    timeline_expectations?: SortOrder
    project_budget?: SortOrder
    agency_scope?: SortOrder
    mandatories?: SortOrder
    technical_requirements?: SortOrder
    target_audience?: SortOrder
    internal_stakeholders?: SortOrder
    consumer_insight?: SortOrder
    rtb_features?: SortOrder
    key_message?: SortOrder
    value_proposition?: SortOrder
    tone_of_voice?: SortOrder
    market_competition?: SortOrder
    inspirations?: SortOrder
    past_communication?: SortOrder
    touchpoints?: SortOrder
    final_notes?: SortOrder
    client_id?: SortOrder
    organization_id?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BriefSumOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    organization_id?: SortOrder
    progress?: SortOrder
  }

  export type EnumProjectTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectType | EnumProjectTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ProjectType[] | ListEnumProjectTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ProjectType[] | ListEnumProjectTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumProjectTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.ProjectType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumProjectTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumProjectTypeNullableFilter<$PrismaModel>
  }

  export type EnumBriefStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BriefStatus | EnumBriefStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BriefStatus[] | ListEnumBriefStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BriefStatus[] | ListEnumBriefStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBriefStatusWithAggregatesFilter<$PrismaModel> | $Enums.BriefStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBriefStatusFilter<$PrismaModel>
    _max?: NestedEnumBriefStatusFilter<$PrismaModel>
  }

  export type ManagerCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ManagerCreateWithoutOrganizationInput, ManagerUncheckedCreateWithoutOrganizationInput> | ManagerCreateWithoutOrganizationInput[] | ManagerUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ManagerCreateOrConnectWithoutOrganizationInput | ManagerCreateOrConnectWithoutOrganizationInput[]
    createMany?: ManagerCreateManyOrganizationInputEnvelope
    connect?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
  }

  export type ClientCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ClientCreateWithoutOrganizationInput, ClientUncheckedCreateWithoutOrganizationInput> | ClientCreateWithoutOrganizationInput[] | ClientUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutOrganizationInput | ClientCreateOrConnectWithoutOrganizationInput[]
    createMany?: ClientCreateManyOrganizationInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type BriefCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<BriefCreateWithoutOrganizationInput, BriefUncheckedCreateWithoutOrganizationInput> | BriefCreateWithoutOrganizationInput[] | BriefUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BriefCreateOrConnectWithoutOrganizationInput | BriefCreateOrConnectWithoutOrganizationInput[]
    createMany?: BriefCreateManyOrganizationInputEnvelope
    connect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
  }

  export type ManagerUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ManagerCreateWithoutOrganizationInput, ManagerUncheckedCreateWithoutOrganizationInput> | ManagerCreateWithoutOrganizationInput[] | ManagerUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ManagerCreateOrConnectWithoutOrganizationInput | ManagerCreateOrConnectWithoutOrganizationInput[]
    createMany?: ManagerCreateManyOrganizationInputEnvelope
    connect?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
  }

  export type ClientUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<ClientCreateWithoutOrganizationInput, ClientUncheckedCreateWithoutOrganizationInput> | ClientCreateWithoutOrganizationInput[] | ClientUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutOrganizationInput | ClientCreateOrConnectWithoutOrganizationInput[]
    createMany?: ClientCreateManyOrganizationInputEnvelope
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
  }

  export type BriefUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<BriefCreateWithoutOrganizationInput, BriefUncheckedCreateWithoutOrganizationInput> | BriefCreateWithoutOrganizationInput[] | BriefUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BriefCreateOrConnectWithoutOrganizationInput | BriefCreateOrConnectWithoutOrganizationInput[]
    createMany?: BriefCreateManyOrganizationInputEnvelope
    connect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ManagerUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ManagerCreateWithoutOrganizationInput, ManagerUncheckedCreateWithoutOrganizationInput> | ManagerCreateWithoutOrganizationInput[] | ManagerUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ManagerCreateOrConnectWithoutOrganizationInput | ManagerCreateOrConnectWithoutOrganizationInput[]
    upsert?: ManagerUpsertWithWhereUniqueWithoutOrganizationInput | ManagerUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ManagerCreateManyOrganizationInputEnvelope
    set?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    disconnect?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    delete?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    connect?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    update?: ManagerUpdateWithWhereUniqueWithoutOrganizationInput | ManagerUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ManagerUpdateManyWithWhereWithoutOrganizationInput | ManagerUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ManagerScalarWhereInput | ManagerScalarWhereInput[]
  }

  export type ClientUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ClientCreateWithoutOrganizationInput, ClientUncheckedCreateWithoutOrganizationInput> | ClientCreateWithoutOrganizationInput[] | ClientUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutOrganizationInput | ClientCreateOrConnectWithoutOrganizationInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutOrganizationInput | ClientUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ClientCreateManyOrganizationInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutOrganizationInput | ClientUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutOrganizationInput | ClientUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type BriefUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<BriefCreateWithoutOrganizationInput, BriefUncheckedCreateWithoutOrganizationInput> | BriefCreateWithoutOrganizationInput[] | BriefUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BriefCreateOrConnectWithoutOrganizationInput | BriefCreateOrConnectWithoutOrganizationInput[]
    upsert?: BriefUpsertWithWhereUniqueWithoutOrganizationInput | BriefUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: BriefCreateManyOrganizationInputEnvelope
    set?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    disconnect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    delete?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    connect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    update?: BriefUpdateWithWhereUniqueWithoutOrganizationInput | BriefUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: BriefUpdateManyWithWhereWithoutOrganizationInput | BriefUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: BriefScalarWhereInput | BriefScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ManagerUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ManagerCreateWithoutOrganizationInput, ManagerUncheckedCreateWithoutOrganizationInput> | ManagerCreateWithoutOrganizationInput[] | ManagerUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ManagerCreateOrConnectWithoutOrganizationInput | ManagerCreateOrConnectWithoutOrganizationInput[]
    upsert?: ManagerUpsertWithWhereUniqueWithoutOrganizationInput | ManagerUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ManagerCreateManyOrganizationInputEnvelope
    set?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    disconnect?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    delete?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    connect?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    update?: ManagerUpdateWithWhereUniqueWithoutOrganizationInput | ManagerUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ManagerUpdateManyWithWhereWithoutOrganizationInput | ManagerUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ManagerScalarWhereInput | ManagerScalarWhereInput[]
  }

  export type ClientUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<ClientCreateWithoutOrganizationInput, ClientUncheckedCreateWithoutOrganizationInput> | ClientCreateWithoutOrganizationInput[] | ClientUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: ClientCreateOrConnectWithoutOrganizationInput | ClientCreateOrConnectWithoutOrganizationInput[]
    upsert?: ClientUpsertWithWhereUniqueWithoutOrganizationInput | ClientUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: ClientCreateManyOrganizationInputEnvelope
    set?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    disconnect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    delete?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    connect?: ClientWhereUniqueInput | ClientWhereUniqueInput[]
    update?: ClientUpdateWithWhereUniqueWithoutOrganizationInput | ClientUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: ClientUpdateManyWithWhereWithoutOrganizationInput | ClientUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: ClientScalarWhereInput | ClientScalarWhereInput[]
  }

  export type BriefUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<BriefCreateWithoutOrganizationInput, BriefUncheckedCreateWithoutOrganizationInput> | BriefCreateWithoutOrganizationInput[] | BriefUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: BriefCreateOrConnectWithoutOrganizationInput | BriefCreateOrConnectWithoutOrganizationInput[]
    upsert?: BriefUpsertWithWhereUniqueWithoutOrganizationInput | BriefUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: BriefCreateManyOrganizationInputEnvelope
    set?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    disconnect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    delete?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    connect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    update?: BriefUpdateWithWhereUniqueWithoutOrganizationInput | BriefUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: BriefUpdateManyWithWhereWithoutOrganizationInput | BriefUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: BriefScalarWhereInput | BriefScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutManagersInput = {
    create?: XOR<OrganizationCreateWithoutManagersInput, OrganizationUncheckedCreateWithoutManagersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutManagersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type BriefCreateNestedManyWithoutManagersInput = {
    create?: XOR<BriefCreateWithoutManagersInput, BriefUncheckedCreateWithoutManagersInput> | BriefCreateWithoutManagersInput[] | BriefUncheckedCreateWithoutManagersInput[]
    connectOrCreate?: BriefCreateOrConnectWithoutManagersInput | BriefCreateOrConnectWithoutManagersInput[]
    connect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
  }

  export type BriefUncheckedCreateNestedManyWithoutManagersInput = {
    create?: XOR<BriefCreateWithoutManagersInput, BriefUncheckedCreateWithoutManagersInput> | BriefCreateWithoutManagersInput[] | BriefUncheckedCreateWithoutManagersInput[]
    connectOrCreate?: BriefCreateOrConnectWithoutManagersInput | BriefCreateOrConnectWithoutManagersInput[]
    connect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumManagerStatusFieldUpdateOperationsInput = {
    set?: $Enums.ManagerStatus
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type OrganizationUpdateOneWithoutManagersNestedInput = {
    create?: XOR<OrganizationCreateWithoutManagersInput, OrganizationUncheckedCreateWithoutManagersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutManagersInput
    upsert?: OrganizationUpsertWithoutManagersInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutManagersInput, OrganizationUpdateWithoutManagersInput>, OrganizationUncheckedUpdateWithoutManagersInput>
  }

  export type BriefUpdateManyWithoutManagersNestedInput = {
    create?: XOR<BriefCreateWithoutManagersInput, BriefUncheckedCreateWithoutManagersInput> | BriefCreateWithoutManagersInput[] | BriefUncheckedCreateWithoutManagersInput[]
    connectOrCreate?: BriefCreateOrConnectWithoutManagersInput | BriefCreateOrConnectWithoutManagersInput[]
    upsert?: BriefUpsertWithWhereUniqueWithoutManagersInput | BriefUpsertWithWhereUniqueWithoutManagersInput[]
    set?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    disconnect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    delete?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    connect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    update?: BriefUpdateWithWhereUniqueWithoutManagersInput | BriefUpdateWithWhereUniqueWithoutManagersInput[]
    updateMany?: BriefUpdateManyWithWhereWithoutManagersInput | BriefUpdateManyWithWhereWithoutManagersInput[]
    deleteMany?: BriefScalarWhereInput | BriefScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BriefUncheckedUpdateManyWithoutManagersNestedInput = {
    create?: XOR<BriefCreateWithoutManagersInput, BriefUncheckedCreateWithoutManagersInput> | BriefCreateWithoutManagersInput[] | BriefUncheckedCreateWithoutManagersInput[]
    connectOrCreate?: BriefCreateOrConnectWithoutManagersInput | BriefCreateOrConnectWithoutManagersInput[]
    upsert?: BriefUpsertWithWhereUniqueWithoutManagersInput | BriefUpsertWithWhereUniqueWithoutManagersInput[]
    set?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    disconnect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    delete?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    connect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    update?: BriefUpdateWithWhereUniqueWithoutManagersInput | BriefUpdateWithWhereUniqueWithoutManagersInput[]
    updateMany?: BriefUpdateManyWithWhereWithoutManagersInput | BriefUpdateManyWithWhereWithoutManagersInput[]
    deleteMany?: BriefScalarWhereInput | BriefScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutClientsInput = {
    create?: XOR<OrganizationCreateWithoutClientsInput, OrganizationUncheckedCreateWithoutClientsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutClientsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type BriefCreateNestedManyWithoutClientInput = {
    create?: XOR<BriefCreateWithoutClientInput, BriefUncheckedCreateWithoutClientInput> | BriefCreateWithoutClientInput[] | BriefUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BriefCreateOrConnectWithoutClientInput | BriefCreateOrConnectWithoutClientInput[]
    createMany?: BriefCreateManyClientInputEnvelope
    connect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
  }

  export type BriefUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<BriefCreateWithoutClientInput, BriefUncheckedCreateWithoutClientInput> | BriefCreateWithoutClientInput[] | BriefUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BriefCreateOrConnectWithoutClientInput | BriefCreateOrConnectWithoutClientInput[]
    createMany?: BriefCreateManyClientInputEnvelope
    connect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
  }

  export type EnumClientStatusFieldUpdateOperationsInput = {
    set?: $Enums.ClientStatus
  }

  export type OrganizationUpdateOneWithoutClientsNestedInput = {
    create?: XOR<OrganizationCreateWithoutClientsInput, OrganizationUncheckedCreateWithoutClientsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutClientsInput
    upsert?: OrganizationUpsertWithoutClientsInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutClientsInput, OrganizationUpdateWithoutClientsInput>, OrganizationUncheckedUpdateWithoutClientsInput>
  }

  export type BriefUpdateManyWithoutClientNestedInput = {
    create?: XOR<BriefCreateWithoutClientInput, BriefUncheckedCreateWithoutClientInput> | BriefCreateWithoutClientInput[] | BriefUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BriefCreateOrConnectWithoutClientInput | BriefCreateOrConnectWithoutClientInput[]
    upsert?: BriefUpsertWithWhereUniqueWithoutClientInput | BriefUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: BriefCreateManyClientInputEnvelope
    set?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    disconnect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    delete?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    connect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    update?: BriefUpdateWithWhereUniqueWithoutClientInput | BriefUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: BriefUpdateManyWithWhereWithoutClientInput | BriefUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: BriefScalarWhereInput | BriefScalarWhereInput[]
  }

  export type BriefUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<BriefCreateWithoutClientInput, BriefUncheckedCreateWithoutClientInput> | BriefCreateWithoutClientInput[] | BriefUncheckedCreateWithoutClientInput[]
    connectOrCreate?: BriefCreateOrConnectWithoutClientInput | BriefCreateOrConnectWithoutClientInput[]
    upsert?: BriefUpsertWithWhereUniqueWithoutClientInput | BriefUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: BriefCreateManyClientInputEnvelope
    set?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    disconnect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    delete?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    connect?: BriefWhereUniqueInput | BriefWhereUniqueInput[]
    update?: BriefUpdateWithWhereUniqueWithoutClientInput | BriefUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: BriefUpdateManyWithWhereWithoutClientInput | BriefUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: BriefScalarWhereInput | BriefScalarWhereInput[]
  }

  export type BriefCreateattachmentsInput = {
    set: string[]
  }

  export type BriefCreatelinksInput = {
    set: string[]
  }

  export type ClientCreateNestedOneWithoutBriefsInput = {
    create?: XOR<ClientCreateWithoutBriefsInput, ClientUncheckedCreateWithoutBriefsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutBriefsInput
    connect?: ClientWhereUniqueInput
  }

  export type ManagerCreateNestedManyWithoutBriefsInput = {
    create?: XOR<ManagerCreateWithoutBriefsInput, ManagerUncheckedCreateWithoutBriefsInput> | ManagerCreateWithoutBriefsInput[] | ManagerUncheckedCreateWithoutBriefsInput[]
    connectOrCreate?: ManagerCreateOrConnectWithoutBriefsInput | ManagerCreateOrConnectWithoutBriefsInput[]
    connect?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
  }

  export type OrganizationCreateNestedOneWithoutBriefsInput = {
    create?: XOR<OrganizationCreateWithoutBriefsInput, OrganizationUncheckedCreateWithoutBriefsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutBriefsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type ManagerUncheckedCreateNestedManyWithoutBriefsInput = {
    create?: XOR<ManagerCreateWithoutBriefsInput, ManagerUncheckedCreateWithoutBriefsInput> | ManagerCreateWithoutBriefsInput[] | ManagerUncheckedCreateWithoutBriefsInput[]
    connectOrCreate?: ManagerCreateOrConnectWithoutBriefsInput | ManagerCreateOrConnectWithoutBriefsInput[]
    connect?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
  }

  export type NullableEnumProjectTypeFieldUpdateOperationsInput = {
    set?: $Enums.ProjectType | null
  }

  export type BriefUpdateattachmentsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BriefUpdatelinksInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumBriefStatusFieldUpdateOperationsInput = {
    set?: $Enums.BriefStatus
  }

  export type ClientUpdateOneRequiredWithoutBriefsNestedInput = {
    create?: XOR<ClientCreateWithoutBriefsInput, ClientUncheckedCreateWithoutBriefsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutBriefsInput
    upsert?: ClientUpsertWithoutBriefsInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutBriefsInput, ClientUpdateWithoutBriefsInput>, ClientUncheckedUpdateWithoutBriefsInput>
  }

  export type ManagerUpdateManyWithoutBriefsNestedInput = {
    create?: XOR<ManagerCreateWithoutBriefsInput, ManagerUncheckedCreateWithoutBriefsInput> | ManagerCreateWithoutBriefsInput[] | ManagerUncheckedCreateWithoutBriefsInput[]
    connectOrCreate?: ManagerCreateOrConnectWithoutBriefsInput | ManagerCreateOrConnectWithoutBriefsInput[]
    upsert?: ManagerUpsertWithWhereUniqueWithoutBriefsInput | ManagerUpsertWithWhereUniqueWithoutBriefsInput[]
    set?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    disconnect?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    delete?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    connect?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    update?: ManagerUpdateWithWhereUniqueWithoutBriefsInput | ManagerUpdateWithWhereUniqueWithoutBriefsInput[]
    updateMany?: ManagerUpdateManyWithWhereWithoutBriefsInput | ManagerUpdateManyWithWhereWithoutBriefsInput[]
    deleteMany?: ManagerScalarWhereInput | ManagerScalarWhereInput[]
  }

  export type OrganizationUpdateOneRequiredWithoutBriefsNestedInput = {
    create?: XOR<OrganizationCreateWithoutBriefsInput, OrganizationUncheckedCreateWithoutBriefsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutBriefsInput
    upsert?: OrganizationUpsertWithoutBriefsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutBriefsInput, OrganizationUpdateWithoutBriefsInput>, OrganizationUncheckedUpdateWithoutBriefsInput>
  }

  export type ManagerUncheckedUpdateManyWithoutBriefsNestedInput = {
    create?: XOR<ManagerCreateWithoutBriefsInput, ManagerUncheckedCreateWithoutBriefsInput> | ManagerCreateWithoutBriefsInput[] | ManagerUncheckedCreateWithoutBriefsInput[]
    connectOrCreate?: ManagerCreateOrConnectWithoutBriefsInput | ManagerCreateOrConnectWithoutBriefsInput[]
    upsert?: ManagerUpsertWithWhereUniqueWithoutBriefsInput | ManagerUpsertWithWhereUniqueWithoutBriefsInput[]
    set?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    disconnect?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    delete?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    connect?: ManagerWhereUniqueInput | ManagerWhereUniqueInput[]
    update?: ManagerUpdateWithWhereUniqueWithoutBriefsInput | ManagerUpdateWithWhereUniqueWithoutBriefsInput[]
    updateMany?: ManagerUpdateManyWithWhereWithoutBriefsInput | ManagerUpdateManyWithWhereWithoutBriefsInput[]
    deleteMany?: ManagerScalarWhereInput | ManagerScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumManagerStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ManagerStatus | EnumManagerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ManagerStatus[] | ListEnumManagerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ManagerStatus[] | ListEnumManagerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumManagerStatusFilter<$PrismaModel> | $Enums.ManagerStatus
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumManagerStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ManagerStatus | EnumManagerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ManagerStatus[] | ListEnumManagerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ManagerStatus[] | ListEnumManagerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumManagerStatusWithAggregatesFilter<$PrismaModel> | $Enums.ManagerStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumManagerStatusFilter<$PrismaModel>
    _max?: NestedEnumManagerStatusFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedEnumClientStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClientStatus | EnumClientStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClientStatus[] | ListEnumClientStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClientStatus[] | ListEnumClientStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClientStatusFilter<$PrismaModel> | $Enums.ClientStatus
  }

  export type NestedEnumClientStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClientStatus | EnumClientStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClientStatus[] | ListEnumClientStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClientStatus[] | ListEnumClientStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClientStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClientStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClientStatusFilter<$PrismaModel>
    _max?: NestedEnumClientStatusFilter<$PrismaModel>
  }

  export type NestedEnumProjectTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectType | EnumProjectTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ProjectType[] | ListEnumProjectTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ProjectType[] | ListEnumProjectTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumProjectTypeNullableFilter<$PrismaModel> | $Enums.ProjectType | null
  }

  export type NestedEnumBriefStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BriefStatus | EnumBriefStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BriefStatus[] | ListEnumBriefStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BriefStatus[] | ListEnumBriefStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBriefStatusFilter<$PrismaModel> | $Enums.BriefStatus
  }

  export type NestedEnumProjectTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProjectType | EnumProjectTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.ProjectType[] | ListEnumProjectTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ProjectType[] | ListEnumProjectTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumProjectTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.ProjectType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumProjectTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumProjectTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumBriefStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BriefStatus | EnumBriefStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BriefStatus[] | ListEnumBriefStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BriefStatus[] | ListEnumBriefStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBriefStatusWithAggregatesFilter<$PrismaModel> | $Enums.BriefStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBriefStatusFilter<$PrismaModel>
    _max?: NestedEnumBriefStatusFilter<$PrismaModel>
  }

  export type ManagerCreateWithoutOrganizationInput = {
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    status?: $Enums.ManagerStatus
    role?: $Enums.UserRole
    created_at?: Date | string
    updated_at?: Date | string
    briefs?: BriefCreateNestedManyWithoutManagersInput
  }

  export type ManagerUncheckedCreateWithoutOrganizationInput = {
    id?: number
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    status?: $Enums.ManagerStatus
    role?: $Enums.UserRole
    created_at?: Date | string
    updated_at?: Date | string
    briefs?: BriefUncheckedCreateNestedManyWithoutManagersInput
  }

  export type ManagerCreateOrConnectWithoutOrganizationInput = {
    where: ManagerWhereUniqueInput
    create: XOR<ManagerCreateWithoutOrganizationInput, ManagerUncheckedCreateWithoutOrganizationInput>
  }

  export type ManagerCreateManyOrganizationInputEnvelope = {
    data: ManagerCreateManyOrganizationInput | ManagerCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type ClientCreateWithoutOrganizationInput = {
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    status?: $Enums.ClientStatus
    created_at?: Date | string
    updated_at?: Date | string
    briefs?: BriefCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutOrganizationInput = {
    id?: number
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    status?: $Enums.ClientStatus
    created_at?: Date | string
    updated_at?: Date | string
    briefs?: BriefUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutOrganizationInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutOrganizationInput, ClientUncheckedCreateWithoutOrganizationInput>
  }

  export type ClientCreateManyOrganizationInputEnvelope = {
    data: ClientCreateManyOrganizationInput | ClientCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type BriefCreateWithoutOrganizationInput = {
    project_name: string
    project_type?: $Enums.ProjectType | null
    project_description?: string | null
    business_goals?: string | null
    communication_goals?: string | null
    project_kpi?: string | null
    challenge?: string | null
    timeline_expectations?: string | null
    project_budget?: string | null
    agency_scope?: string | null
    mandatories?: string | null
    technical_requirements?: string | null
    target_audience?: string | null
    internal_stakeholders?: string | null
    consumer_insight?: string | null
    rtb_features?: string | null
    key_message?: string | null
    value_proposition?: string | null
    tone_of_voice?: string | null
    market_competition?: string | null
    inspirations?: string | null
    past_communication?: string | null
    touchpoints?: string | null
    final_notes?: string | null
    attachments?: BriefCreateattachmentsInput | string[]
    links?: BriefCreatelinksInput | string[]
    status?: $Enums.BriefStatus
    progress?: number
    created_at?: Date | string
    updated_at?: Date | string
    client: ClientCreateNestedOneWithoutBriefsInput
    managers?: ManagerCreateNestedManyWithoutBriefsInput
  }

  export type BriefUncheckedCreateWithoutOrganizationInput = {
    id?: number
    project_name: string
    project_type?: $Enums.ProjectType | null
    project_description?: string | null
    business_goals?: string | null
    communication_goals?: string | null
    project_kpi?: string | null
    challenge?: string | null
    timeline_expectations?: string | null
    project_budget?: string | null
    agency_scope?: string | null
    mandatories?: string | null
    technical_requirements?: string | null
    target_audience?: string | null
    internal_stakeholders?: string | null
    consumer_insight?: string | null
    rtb_features?: string | null
    key_message?: string | null
    value_proposition?: string | null
    tone_of_voice?: string | null
    market_competition?: string | null
    inspirations?: string | null
    past_communication?: string | null
    touchpoints?: string | null
    final_notes?: string | null
    attachments?: BriefCreateattachmentsInput | string[]
    links?: BriefCreatelinksInput | string[]
    client_id: number
    status?: $Enums.BriefStatus
    progress?: number
    created_at?: Date | string
    updated_at?: Date | string
    managers?: ManagerUncheckedCreateNestedManyWithoutBriefsInput
  }

  export type BriefCreateOrConnectWithoutOrganizationInput = {
    where: BriefWhereUniqueInput
    create: XOR<BriefCreateWithoutOrganizationInput, BriefUncheckedCreateWithoutOrganizationInput>
  }

  export type BriefCreateManyOrganizationInputEnvelope = {
    data: BriefCreateManyOrganizationInput | BriefCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type ManagerUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: ManagerWhereUniqueInput
    update: XOR<ManagerUpdateWithoutOrganizationInput, ManagerUncheckedUpdateWithoutOrganizationInput>
    create: XOR<ManagerCreateWithoutOrganizationInput, ManagerUncheckedCreateWithoutOrganizationInput>
  }

  export type ManagerUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: ManagerWhereUniqueInput
    data: XOR<ManagerUpdateWithoutOrganizationInput, ManagerUncheckedUpdateWithoutOrganizationInput>
  }

  export type ManagerUpdateManyWithWhereWithoutOrganizationInput = {
    where: ManagerScalarWhereInput
    data: XOR<ManagerUpdateManyMutationInput, ManagerUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type ManagerScalarWhereInput = {
    AND?: ManagerScalarWhereInput | ManagerScalarWhereInput[]
    OR?: ManagerScalarWhereInput[]
    NOT?: ManagerScalarWhereInput | ManagerScalarWhereInput[]
    id?: IntFilter<"Manager"> | number
    name?: StringFilter<"Manager"> | string
    title?: StringNullableFilter<"Manager"> | string | null
    avatar?: StringNullableFilter<"Manager"> | string | null
    email?: StringNullableFilter<"Manager"> | string | null
    organization_id?: IntNullableFilter<"Manager"> | number | null
    status?: EnumManagerStatusFilter<"Manager"> | $Enums.ManagerStatus
    role?: EnumUserRoleFilter<"Manager"> | $Enums.UserRole
    created_at?: DateTimeFilter<"Manager"> | Date | string
    updated_at?: DateTimeFilter<"Manager"> | Date | string
  }

  export type ClientUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: ClientWhereUniqueInput
    update: XOR<ClientUpdateWithoutOrganizationInput, ClientUncheckedUpdateWithoutOrganizationInput>
    create: XOR<ClientCreateWithoutOrganizationInput, ClientUncheckedCreateWithoutOrganizationInput>
  }

  export type ClientUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: ClientWhereUniqueInput
    data: XOR<ClientUpdateWithoutOrganizationInput, ClientUncheckedUpdateWithoutOrganizationInput>
  }

  export type ClientUpdateManyWithWhereWithoutOrganizationInput = {
    where: ClientScalarWhereInput
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type ClientScalarWhereInput = {
    AND?: ClientScalarWhereInput | ClientScalarWhereInput[]
    OR?: ClientScalarWhereInput[]
    NOT?: ClientScalarWhereInput | ClientScalarWhereInput[]
    id?: IntFilter<"Client"> | number
    name?: StringFilter<"Client"> | string
    title?: StringNullableFilter<"Client"> | string | null
    avatar?: StringNullableFilter<"Client"> | string | null
    email?: StringNullableFilter<"Client"> | string | null
    organization_id?: IntNullableFilter<"Client"> | number | null
    status?: EnumClientStatusFilter<"Client"> | $Enums.ClientStatus
    created_at?: DateTimeFilter<"Client"> | Date | string
    updated_at?: DateTimeFilter<"Client"> | Date | string
  }

  export type BriefUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: BriefWhereUniqueInput
    update: XOR<BriefUpdateWithoutOrganizationInput, BriefUncheckedUpdateWithoutOrganizationInput>
    create: XOR<BriefCreateWithoutOrganizationInput, BriefUncheckedCreateWithoutOrganizationInput>
  }

  export type BriefUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: BriefWhereUniqueInput
    data: XOR<BriefUpdateWithoutOrganizationInput, BriefUncheckedUpdateWithoutOrganizationInput>
  }

  export type BriefUpdateManyWithWhereWithoutOrganizationInput = {
    where: BriefScalarWhereInput
    data: XOR<BriefUpdateManyMutationInput, BriefUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type BriefScalarWhereInput = {
    AND?: BriefScalarWhereInput | BriefScalarWhereInput[]
    OR?: BriefScalarWhereInput[]
    NOT?: BriefScalarWhereInput | BriefScalarWhereInput[]
    id?: IntFilter<"Brief"> | number
    project_name?: StringFilter<"Brief"> | string
    project_type?: EnumProjectTypeNullableFilter<"Brief"> | $Enums.ProjectType | null
    project_description?: StringNullableFilter<"Brief"> | string | null
    business_goals?: StringNullableFilter<"Brief"> | string | null
    communication_goals?: StringNullableFilter<"Brief"> | string | null
    project_kpi?: StringNullableFilter<"Brief"> | string | null
    challenge?: StringNullableFilter<"Brief"> | string | null
    timeline_expectations?: StringNullableFilter<"Brief"> | string | null
    project_budget?: StringNullableFilter<"Brief"> | string | null
    agency_scope?: StringNullableFilter<"Brief"> | string | null
    mandatories?: StringNullableFilter<"Brief"> | string | null
    technical_requirements?: StringNullableFilter<"Brief"> | string | null
    target_audience?: StringNullableFilter<"Brief"> | string | null
    internal_stakeholders?: StringNullableFilter<"Brief"> | string | null
    consumer_insight?: StringNullableFilter<"Brief"> | string | null
    rtb_features?: StringNullableFilter<"Brief"> | string | null
    key_message?: StringNullableFilter<"Brief"> | string | null
    value_proposition?: StringNullableFilter<"Brief"> | string | null
    tone_of_voice?: StringNullableFilter<"Brief"> | string | null
    market_competition?: StringNullableFilter<"Brief"> | string | null
    inspirations?: StringNullableFilter<"Brief"> | string | null
    past_communication?: StringNullableFilter<"Brief"> | string | null
    touchpoints?: StringNullableFilter<"Brief"> | string | null
    final_notes?: StringNullableFilter<"Brief"> | string | null
    attachments?: StringNullableListFilter<"Brief">
    links?: StringNullableListFilter<"Brief">
    client_id?: IntFilter<"Brief"> | number
    organization_id?: IntFilter<"Brief"> | number
    status?: EnumBriefStatusFilter<"Brief"> | $Enums.BriefStatus
    progress?: IntFilter<"Brief"> | number
    created_at?: DateTimeFilter<"Brief"> | Date | string
    updated_at?: DateTimeFilter<"Brief"> | Date | string
  }

  export type OrganizationCreateWithoutManagersInput = {
    name: string
    ai_support?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    clients?: ClientCreateNestedManyWithoutOrganizationInput
    briefs?: BriefCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutManagersInput = {
    id?: number
    name: string
    ai_support?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    clients?: ClientUncheckedCreateNestedManyWithoutOrganizationInput
    briefs?: BriefUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutManagersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutManagersInput, OrganizationUncheckedCreateWithoutManagersInput>
  }

  export type BriefCreateWithoutManagersInput = {
    project_name: string
    project_type?: $Enums.ProjectType | null
    project_description?: string | null
    business_goals?: string | null
    communication_goals?: string | null
    project_kpi?: string | null
    challenge?: string | null
    timeline_expectations?: string | null
    project_budget?: string | null
    agency_scope?: string | null
    mandatories?: string | null
    technical_requirements?: string | null
    target_audience?: string | null
    internal_stakeholders?: string | null
    consumer_insight?: string | null
    rtb_features?: string | null
    key_message?: string | null
    value_proposition?: string | null
    tone_of_voice?: string | null
    market_competition?: string | null
    inspirations?: string | null
    past_communication?: string | null
    touchpoints?: string | null
    final_notes?: string | null
    attachments?: BriefCreateattachmentsInput | string[]
    links?: BriefCreatelinksInput | string[]
    status?: $Enums.BriefStatus
    progress?: number
    created_at?: Date | string
    updated_at?: Date | string
    client: ClientCreateNestedOneWithoutBriefsInput
    organization: OrganizationCreateNestedOneWithoutBriefsInput
  }

  export type BriefUncheckedCreateWithoutManagersInput = {
    id?: number
    project_name: string
    project_type?: $Enums.ProjectType | null
    project_description?: string | null
    business_goals?: string | null
    communication_goals?: string | null
    project_kpi?: string | null
    challenge?: string | null
    timeline_expectations?: string | null
    project_budget?: string | null
    agency_scope?: string | null
    mandatories?: string | null
    technical_requirements?: string | null
    target_audience?: string | null
    internal_stakeholders?: string | null
    consumer_insight?: string | null
    rtb_features?: string | null
    key_message?: string | null
    value_proposition?: string | null
    tone_of_voice?: string | null
    market_competition?: string | null
    inspirations?: string | null
    past_communication?: string | null
    touchpoints?: string | null
    final_notes?: string | null
    attachments?: BriefCreateattachmentsInput | string[]
    links?: BriefCreatelinksInput | string[]
    client_id: number
    organization_id: number
    status?: $Enums.BriefStatus
    progress?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BriefCreateOrConnectWithoutManagersInput = {
    where: BriefWhereUniqueInput
    create: XOR<BriefCreateWithoutManagersInput, BriefUncheckedCreateWithoutManagersInput>
  }

  export type OrganizationUpsertWithoutManagersInput = {
    update: XOR<OrganizationUpdateWithoutManagersInput, OrganizationUncheckedUpdateWithoutManagersInput>
    create: XOR<OrganizationCreateWithoutManagersInput, OrganizationUncheckedCreateWithoutManagersInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutManagersInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutManagersInput, OrganizationUncheckedUpdateWithoutManagersInput>
  }

  export type OrganizationUpdateWithoutManagersInput = {
    name?: StringFieldUpdateOperationsInput | string
    ai_support?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUpdateManyWithoutOrganizationNestedInput
    briefs?: BriefUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutManagersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ai_support?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    clients?: ClientUncheckedUpdateManyWithoutOrganizationNestedInput
    briefs?: BriefUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type BriefUpsertWithWhereUniqueWithoutManagersInput = {
    where: BriefWhereUniqueInput
    update: XOR<BriefUpdateWithoutManagersInput, BriefUncheckedUpdateWithoutManagersInput>
    create: XOR<BriefCreateWithoutManagersInput, BriefUncheckedCreateWithoutManagersInput>
  }

  export type BriefUpdateWithWhereUniqueWithoutManagersInput = {
    where: BriefWhereUniqueInput
    data: XOR<BriefUpdateWithoutManagersInput, BriefUncheckedUpdateWithoutManagersInput>
  }

  export type BriefUpdateManyWithWhereWithoutManagersInput = {
    where: BriefScalarWhereInput
    data: XOR<BriefUpdateManyMutationInput, BriefUncheckedUpdateManyWithoutManagersInput>
  }

  export type OrganizationCreateWithoutClientsInput = {
    name: string
    ai_support?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    managers?: ManagerCreateNestedManyWithoutOrganizationInput
    briefs?: BriefCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutClientsInput = {
    id?: number
    name: string
    ai_support?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    managers?: ManagerUncheckedCreateNestedManyWithoutOrganizationInput
    briefs?: BriefUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutClientsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutClientsInput, OrganizationUncheckedCreateWithoutClientsInput>
  }

  export type BriefCreateWithoutClientInput = {
    project_name: string
    project_type?: $Enums.ProjectType | null
    project_description?: string | null
    business_goals?: string | null
    communication_goals?: string | null
    project_kpi?: string | null
    challenge?: string | null
    timeline_expectations?: string | null
    project_budget?: string | null
    agency_scope?: string | null
    mandatories?: string | null
    technical_requirements?: string | null
    target_audience?: string | null
    internal_stakeholders?: string | null
    consumer_insight?: string | null
    rtb_features?: string | null
    key_message?: string | null
    value_proposition?: string | null
    tone_of_voice?: string | null
    market_competition?: string | null
    inspirations?: string | null
    past_communication?: string | null
    touchpoints?: string | null
    final_notes?: string | null
    attachments?: BriefCreateattachmentsInput | string[]
    links?: BriefCreatelinksInput | string[]
    status?: $Enums.BriefStatus
    progress?: number
    created_at?: Date | string
    updated_at?: Date | string
    managers?: ManagerCreateNestedManyWithoutBriefsInput
    organization: OrganizationCreateNestedOneWithoutBriefsInput
  }

  export type BriefUncheckedCreateWithoutClientInput = {
    id?: number
    project_name: string
    project_type?: $Enums.ProjectType | null
    project_description?: string | null
    business_goals?: string | null
    communication_goals?: string | null
    project_kpi?: string | null
    challenge?: string | null
    timeline_expectations?: string | null
    project_budget?: string | null
    agency_scope?: string | null
    mandatories?: string | null
    technical_requirements?: string | null
    target_audience?: string | null
    internal_stakeholders?: string | null
    consumer_insight?: string | null
    rtb_features?: string | null
    key_message?: string | null
    value_proposition?: string | null
    tone_of_voice?: string | null
    market_competition?: string | null
    inspirations?: string | null
    past_communication?: string | null
    touchpoints?: string | null
    final_notes?: string | null
    attachments?: BriefCreateattachmentsInput | string[]
    links?: BriefCreatelinksInput | string[]
    organization_id: number
    status?: $Enums.BriefStatus
    progress?: number
    created_at?: Date | string
    updated_at?: Date | string
    managers?: ManagerUncheckedCreateNestedManyWithoutBriefsInput
  }

  export type BriefCreateOrConnectWithoutClientInput = {
    where: BriefWhereUniqueInput
    create: XOR<BriefCreateWithoutClientInput, BriefUncheckedCreateWithoutClientInput>
  }

  export type BriefCreateManyClientInputEnvelope = {
    data: BriefCreateManyClientInput | BriefCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutClientsInput = {
    update: XOR<OrganizationUpdateWithoutClientsInput, OrganizationUncheckedUpdateWithoutClientsInput>
    create: XOR<OrganizationCreateWithoutClientsInput, OrganizationUncheckedCreateWithoutClientsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutClientsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutClientsInput, OrganizationUncheckedUpdateWithoutClientsInput>
  }

  export type OrganizationUpdateWithoutClientsInput = {
    name?: StringFieldUpdateOperationsInput | string
    ai_support?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    managers?: ManagerUpdateManyWithoutOrganizationNestedInput
    briefs?: BriefUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutClientsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ai_support?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    managers?: ManagerUncheckedUpdateManyWithoutOrganizationNestedInput
    briefs?: BriefUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type BriefUpsertWithWhereUniqueWithoutClientInput = {
    where: BriefWhereUniqueInput
    update: XOR<BriefUpdateWithoutClientInput, BriefUncheckedUpdateWithoutClientInput>
    create: XOR<BriefCreateWithoutClientInput, BriefUncheckedCreateWithoutClientInput>
  }

  export type BriefUpdateWithWhereUniqueWithoutClientInput = {
    where: BriefWhereUniqueInput
    data: XOR<BriefUpdateWithoutClientInput, BriefUncheckedUpdateWithoutClientInput>
  }

  export type BriefUpdateManyWithWhereWithoutClientInput = {
    where: BriefScalarWhereInput
    data: XOR<BriefUpdateManyMutationInput, BriefUncheckedUpdateManyWithoutClientInput>
  }

  export type ClientCreateWithoutBriefsInput = {
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    status?: $Enums.ClientStatus
    created_at?: Date | string
    updated_at?: Date | string
    organization?: OrganizationCreateNestedOneWithoutClientsInput
  }

  export type ClientUncheckedCreateWithoutBriefsInput = {
    id?: number
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    organization_id?: number | null
    status?: $Enums.ClientStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ClientCreateOrConnectWithoutBriefsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutBriefsInput, ClientUncheckedCreateWithoutBriefsInput>
  }

  export type ManagerCreateWithoutBriefsInput = {
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    status?: $Enums.ManagerStatus
    role?: $Enums.UserRole
    created_at?: Date | string
    updated_at?: Date | string
    organization?: OrganizationCreateNestedOneWithoutManagersInput
  }

  export type ManagerUncheckedCreateWithoutBriefsInput = {
    id?: number
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    organization_id?: number | null
    status?: $Enums.ManagerStatus
    role?: $Enums.UserRole
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ManagerCreateOrConnectWithoutBriefsInput = {
    where: ManagerWhereUniqueInput
    create: XOR<ManagerCreateWithoutBriefsInput, ManagerUncheckedCreateWithoutBriefsInput>
  }

  export type OrganizationCreateWithoutBriefsInput = {
    name: string
    ai_support?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    managers?: ManagerCreateNestedManyWithoutOrganizationInput
    clients?: ClientCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutBriefsInput = {
    id?: number
    name: string
    ai_support?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    managers?: ManagerUncheckedCreateNestedManyWithoutOrganizationInput
    clients?: ClientUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutBriefsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutBriefsInput, OrganizationUncheckedCreateWithoutBriefsInput>
  }

  export type ClientUpsertWithoutBriefsInput = {
    update: XOR<ClientUpdateWithoutBriefsInput, ClientUncheckedUpdateWithoutBriefsInput>
    create: XOR<ClientCreateWithoutBriefsInput, ClientUncheckedCreateWithoutBriefsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutBriefsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutBriefsInput, ClientUncheckedUpdateWithoutBriefsInput>
  }

  export type ClientUpdateWithoutBriefsInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClientStatusFieldUpdateOperationsInput | $Enums.ClientStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutClientsNestedInput
  }

  export type ClientUncheckedUpdateWithoutBriefsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    organization_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumClientStatusFieldUpdateOperationsInput | $Enums.ClientStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManagerUpsertWithWhereUniqueWithoutBriefsInput = {
    where: ManagerWhereUniqueInput
    update: XOR<ManagerUpdateWithoutBriefsInput, ManagerUncheckedUpdateWithoutBriefsInput>
    create: XOR<ManagerCreateWithoutBriefsInput, ManagerUncheckedCreateWithoutBriefsInput>
  }

  export type ManagerUpdateWithWhereUniqueWithoutBriefsInput = {
    where: ManagerWhereUniqueInput
    data: XOR<ManagerUpdateWithoutBriefsInput, ManagerUncheckedUpdateWithoutBriefsInput>
  }

  export type ManagerUpdateManyWithWhereWithoutBriefsInput = {
    where: ManagerScalarWhereInput
    data: XOR<ManagerUpdateManyMutationInput, ManagerUncheckedUpdateManyWithoutBriefsInput>
  }

  export type OrganizationUpsertWithoutBriefsInput = {
    update: XOR<OrganizationUpdateWithoutBriefsInput, OrganizationUncheckedUpdateWithoutBriefsInput>
    create: XOR<OrganizationCreateWithoutBriefsInput, OrganizationUncheckedCreateWithoutBriefsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutBriefsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutBriefsInput, OrganizationUncheckedUpdateWithoutBriefsInput>
  }

  export type OrganizationUpdateWithoutBriefsInput = {
    name?: StringFieldUpdateOperationsInput | string
    ai_support?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    managers?: ManagerUpdateManyWithoutOrganizationNestedInput
    clients?: ClientUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutBriefsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    ai_support?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    managers?: ManagerUncheckedUpdateManyWithoutOrganizationNestedInput
    clients?: ClientUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type ManagerCreateManyOrganizationInput = {
    id?: number
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    status?: $Enums.ManagerStatus
    role?: $Enums.UserRole
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ClientCreateManyOrganizationInput = {
    id?: number
    name: string
    title?: string | null
    avatar?: string | null
    email?: string | null
    status?: $Enums.ClientStatus
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BriefCreateManyOrganizationInput = {
    id?: number
    project_name: string
    project_type?: $Enums.ProjectType | null
    project_description?: string | null
    business_goals?: string | null
    communication_goals?: string | null
    project_kpi?: string | null
    challenge?: string | null
    timeline_expectations?: string | null
    project_budget?: string | null
    agency_scope?: string | null
    mandatories?: string | null
    technical_requirements?: string | null
    target_audience?: string | null
    internal_stakeholders?: string | null
    consumer_insight?: string | null
    rtb_features?: string | null
    key_message?: string | null
    value_proposition?: string | null
    tone_of_voice?: string | null
    market_competition?: string | null
    inspirations?: string | null
    past_communication?: string | null
    touchpoints?: string | null
    final_notes?: string | null
    attachments?: BriefCreateattachmentsInput | string[]
    links?: BriefCreatelinksInput | string[]
    client_id: number
    status?: $Enums.BriefStatus
    progress?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ManagerUpdateWithoutOrganizationInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumManagerStatusFieldUpdateOperationsInput | $Enums.ManagerStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    briefs?: BriefUpdateManyWithoutManagersNestedInput
  }

  export type ManagerUncheckedUpdateWithoutOrganizationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumManagerStatusFieldUpdateOperationsInput | $Enums.ManagerStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    briefs?: BriefUncheckedUpdateManyWithoutManagersNestedInput
  }

  export type ManagerUncheckedUpdateManyWithoutOrganizationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumManagerStatusFieldUpdateOperationsInput | $Enums.ManagerStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUpdateWithoutOrganizationInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClientStatusFieldUpdateOperationsInput | $Enums.ClientStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    briefs?: BriefUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutOrganizationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClientStatusFieldUpdateOperationsInput | $Enums.ClientStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    briefs?: BriefUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateManyWithoutOrganizationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClientStatusFieldUpdateOperationsInput | $Enums.ClientStatus
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BriefUpdateWithoutOrganizationInput = {
    project_name?: StringFieldUpdateOperationsInput | string
    project_type?: NullableEnumProjectTypeFieldUpdateOperationsInput | $Enums.ProjectType | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    business_goals?: NullableStringFieldUpdateOperationsInput | string | null
    communication_goals?: NullableStringFieldUpdateOperationsInput | string | null
    project_kpi?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    timeline_expectations?: NullableStringFieldUpdateOperationsInput | string | null
    project_budget?: NullableStringFieldUpdateOperationsInput | string | null
    agency_scope?: NullableStringFieldUpdateOperationsInput | string | null
    mandatories?: NullableStringFieldUpdateOperationsInput | string | null
    technical_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    target_audience?: NullableStringFieldUpdateOperationsInput | string | null
    internal_stakeholders?: NullableStringFieldUpdateOperationsInput | string | null
    consumer_insight?: NullableStringFieldUpdateOperationsInput | string | null
    rtb_features?: NullableStringFieldUpdateOperationsInput | string | null
    key_message?: NullableStringFieldUpdateOperationsInput | string | null
    value_proposition?: NullableStringFieldUpdateOperationsInput | string | null
    tone_of_voice?: NullableStringFieldUpdateOperationsInput | string | null
    market_competition?: NullableStringFieldUpdateOperationsInput | string | null
    inspirations?: NullableStringFieldUpdateOperationsInput | string | null
    past_communication?: NullableStringFieldUpdateOperationsInput | string | null
    touchpoints?: NullableStringFieldUpdateOperationsInput | string | null
    final_notes?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: BriefUpdateattachmentsInput | string[]
    links?: BriefUpdatelinksInput | string[]
    status?: EnumBriefStatusFieldUpdateOperationsInput | $Enums.BriefStatus
    progress?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutBriefsNestedInput
    managers?: ManagerUpdateManyWithoutBriefsNestedInput
  }

  export type BriefUncheckedUpdateWithoutOrganizationInput = {
    id?: IntFieldUpdateOperationsInput | number
    project_name?: StringFieldUpdateOperationsInput | string
    project_type?: NullableEnumProjectTypeFieldUpdateOperationsInput | $Enums.ProjectType | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    business_goals?: NullableStringFieldUpdateOperationsInput | string | null
    communication_goals?: NullableStringFieldUpdateOperationsInput | string | null
    project_kpi?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    timeline_expectations?: NullableStringFieldUpdateOperationsInput | string | null
    project_budget?: NullableStringFieldUpdateOperationsInput | string | null
    agency_scope?: NullableStringFieldUpdateOperationsInput | string | null
    mandatories?: NullableStringFieldUpdateOperationsInput | string | null
    technical_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    target_audience?: NullableStringFieldUpdateOperationsInput | string | null
    internal_stakeholders?: NullableStringFieldUpdateOperationsInput | string | null
    consumer_insight?: NullableStringFieldUpdateOperationsInput | string | null
    rtb_features?: NullableStringFieldUpdateOperationsInput | string | null
    key_message?: NullableStringFieldUpdateOperationsInput | string | null
    value_proposition?: NullableStringFieldUpdateOperationsInput | string | null
    tone_of_voice?: NullableStringFieldUpdateOperationsInput | string | null
    market_competition?: NullableStringFieldUpdateOperationsInput | string | null
    inspirations?: NullableStringFieldUpdateOperationsInput | string | null
    past_communication?: NullableStringFieldUpdateOperationsInput | string | null
    touchpoints?: NullableStringFieldUpdateOperationsInput | string | null
    final_notes?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: BriefUpdateattachmentsInput | string[]
    links?: BriefUpdatelinksInput | string[]
    client_id?: IntFieldUpdateOperationsInput | number
    status?: EnumBriefStatusFieldUpdateOperationsInput | $Enums.BriefStatus
    progress?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    managers?: ManagerUncheckedUpdateManyWithoutBriefsNestedInput
  }

  export type BriefUncheckedUpdateManyWithoutOrganizationInput = {
    id?: IntFieldUpdateOperationsInput | number
    project_name?: StringFieldUpdateOperationsInput | string
    project_type?: NullableEnumProjectTypeFieldUpdateOperationsInput | $Enums.ProjectType | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    business_goals?: NullableStringFieldUpdateOperationsInput | string | null
    communication_goals?: NullableStringFieldUpdateOperationsInput | string | null
    project_kpi?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    timeline_expectations?: NullableStringFieldUpdateOperationsInput | string | null
    project_budget?: NullableStringFieldUpdateOperationsInput | string | null
    agency_scope?: NullableStringFieldUpdateOperationsInput | string | null
    mandatories?: NullableStringFieldUpdateOperationsInput | string | null
    technical_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    target_audience?: NullableStringFieldUpdateOperationsInput | string | null
    internal_stakeholders?: NullableStringFieldUpdateOperationsInput | string | null
    consumer_insight?: NullableStringFieldUpdateOperationsInput | string | null
    rtb_features?: NullableStringFieldUpdateOperationsInput | string | null
    key_message?: NullableStringFieldUpdateOperationsInput | string | null
    value_proposition?: NullableStringFieldUpdateOperationsInput | string | null
    tone_of_voice?: NullableStringFieldUpdateOperationsInput | string | null
    market_competition?: NullableStringFieldUpdateOperationsInput | string | null
    inspirations?: NullableStringFieldUpdateOperationsInput | string | null
    past_communication?: NullableStringFieldUpdateOperationsInput | string | null
    touchpoints?: NullableStringFieldUpdateOperationsInput | string | null
    final_notes?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: BriefUpdateattachmentsInput | string[]
    links?: BriefUpdatelinksInput | string[]
    client_id?: IntFieldUpdateOperationsInput | number
    status?: EnumBriefStatusFieldUpdateOperationsInput | $Enums.BriefStatus
    progress?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BriefUpdateWithoutManagersInput = {
    project_name?: StringFieldUpdateOperationsInput | string
    project_type?: NullableEnumProjectTypeFieldUpdateOperationsInput | $Enums.ProjectType | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    business_goals?: NullableStringFieldUpdateOperationsInput | string | null
    communication_goals?: NullableStringFieldUpdateOperationsInput | string | null
    project_kpi?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    timeline_expectations?: NullableStringFieldUpdateOperationsInput | string | null
    project_budget?: NullableStringFieldUpdateOperationsInput | string | null
    agency_scope?: NullableStringFieldUpdateOperationsInput | string | null
    mandatories?: NullableStringFieldUpdateOperationsInput | string | null
    technical_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    target_audience?: NullableStringFieldUpdateOperationsInput | string | null
    internal_stakeholders?: NullableStringFieldUpdateOperationsInput | string | null
    consumer_insight?: NullableStringFieldUpdateOperationsInput | string | null
    rtb_features?: NullableStringFieldUpdateOperationsInput | string | null
    key_message?: NullableStringFieldUpdateOperationsInput | string | null
    value_proposition?: NullableStringFieldUpdateOperationsInput | string | null
    tone_of_voice?: NullableStringFieldUpdateOperationsInput | string | null
    market_competition?: NullableStringFieldUpdateOperationsInput | string | null
    inspirations?: NullableStringFieldUpdateOperationsInput | string | null
    past_communication?: NullableStringFieldUpdateOperationsInput | string | null
    touchpoints?: NullableStringFieldUpdateOperationsInput | string | null
    final_notes?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: BriefUpdateattachmentsInput | string[]
    links?: BriefUpdatelinksInput | string[]
    status?: EnumBriefStatusFieldUpdateOperationsInput | $Enums.BriefStatus
    progress?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutBriefsNestedInput
    organization?: OrganizationUpdateOneRequiredWithoutBriefsNestedInput
  }

  export type BriefUncheckedUpdateWithoutManagersInput = {
    id?: IntFieldUpdateOperationsInput | number
    project_name?: StringFieldUpdateOperationsInput | string
    project_type?: NullableEnumProjectTypeFieldUpdateOperationsInput | $Enums.ProjectType | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    business_goals?: NullableStringFieldUpdateOperationsInput | string | null
    communication_goals?: NullableStringFieldUpdateOperationsInput | string | null
    project_kpi?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    timeline_expectations?: NullableStringFieldUpdateOperationsInput | string | null
    project_budget?: NullableStringFieldUpdateOperationsInput | string | null
    agency_scope?: NullableStringFieldUpdateOperationsInput | string | null
    mandatories?: NullableStringFieldUpdateOperationsInput | string | null
    technical_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    target_audience?: NullableStringFieldUpdateOperationsInput | string | null
    internal_stakeholders?: NullableStringFieldUpdateOperationsInput | string | null
    consumer_insight?: NullableStringFieldUpdateOperationsInput | string | null
    rtb_features?: NullableStringFieldUpdateOperationsInput | string | null
    key_message?: NullableStringFieldUpdateOperationsInput | string | null
    value_proposition?: NullableStringFieldUpdateOperationsInput | string | null
    tone_of_voice?: NullableStringFieldUpdateOperationsInput | string | null
    market_competition?: NullableStringFieldUpdateOperationsInput | string | null
    inspirations?: NullableStringFieldUpdateOperationsInput | string | null
    past_communication?: NullableStringFieldUpdateOperationsInput | string | null
    touchpoints?: NullableStringFieldUpdateOperationsInput | string | null
    final_notes?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: BriefUpdateattachmentsInput | string[]
    links?: BriefUpdatelinksInput | string[]
    client_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    status?: EnumBriefStatusFieldUpdateOperationsInput | $Enums.BriefStatus
    progress?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BriefUncheckedUpdateManyWithoutManagersInput = {
    id?: IntFieldUpdateOperationsInput | number
    project_name?: StringFieldUpdateOperationsInput | string
    project_type?: NullableEnumProjectTypeFieldUpdateOperationsInput | $Enums.ProjectType | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    business_goals?: NullableStringFieldUpdateOperationsInput | string | null
    communication_goals?: NullableStringFieldUpdateOperationsInput | string | null
    project_kpi?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    timeline_expectations?: NullableStringFieldUpdateOperationsInput | string | null
    project_budget?: NullableStringFieldUpdateOperationsInput | string | null
    agency_scope?: NullableStringFieldUpdateOperationsInput | string | null
    mandatories?: NullableStringFieldUpdateOperationsInput | string | null
    technical_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    target_audience?: NullableStringFieldUpdateOperationsInput | string | null
    internal_stakeholders?: NullableStringFieldUpdateOperationsInput | string | null
    consumer_insight?: NullableStringFieldUpdateOperationsInput | string | null
    rtb_features?: NullableStringFieldUpdateOperationsInput | string | null
    key_message?: NullableStringFieldUpdateOperationsInput | string | null
    value_proposition?: NullableStringFieldUpdateOperationsInput | string | null
    tone_of_voice?: NullableStringFieldUpdateOperationsInput | string | null
    market_competition?: NullableStringFieldUpdateOperationsInput | string | null
    inspirations?: NullableStringFieldUpdateOperationsInput | string | null
    past_communication?: NullableStringFieldUpdateOperationsInput | string | null
    touchpoints?: NullableStringFieldUpdateOperationsInput | string | null
    final_notes?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: BriefUpdateattachmentsInput | string[]
    links?: BriefUpdatelinksInput | string[]
    client_id?: IntFieldUpdateOperationsInput | number
    organization_id?: IntFieldUpdateOperationsInput | number
    status?: EnumBriefStatusFieldUpdateOperationsInput | $Enums.BriefStatus
    progress?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BriefCreateManyClientInput = {
    id?: number
    project_name: string
    project_type?: $Enums.ProjectType | null
    project_description?: string | null
    business_goals?: string | null
    communication_goals?: string | null
    project_kpi?: string | null
    challenge?: string | null
    timeline_expectations?: string | null
    project_budget?: string | null
    agency_scope?: string | null
    mandatories?: string | null
    technical_requirements?: string | null
    target_audience?: string | null
    internal_stakeholders?: string | null
    consumer_insight?: string | null
    rtb_features?: string | null
    key_message?: string | null
    value_proposition?: string | null
    tone_of_voice?: string | null
    market_competition?: string | null
    inspirations?: string | null
    past_communication?: string | null
    touchpoints?: string | null
    final_notes?: string | null
    attachments?: BriefCreateattachmentsInput | string[]
    links?: BriefCreatelinksInput | string[]
    organization_id: number
    status?: $Enums.BriefStatus
    progress?: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type BriefUpdateWithoutClientInput = {
    project_name?: StringFieldUpdateOperationsInput | string
    project_type?: NullableEnumProjectTypeFieldUpdateOperationsInput | $Enums.ProjectType | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    business_goals?: NullableStringFieldUpdateOperationsInput | string | null
    communication_goals?: NullableStringFieldUpdateOperationsInput | string | null
    project_kpi?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    timeline_expectations?: NullableStringFieldUpdateOperationsInput | string | null
    project_budget?: NullableStringFieldUpdateOperationsInput | string | null
    agency_scope?: NullableStringFieldUpdateOperationsInput | string | null
    mandatories?: NullableStringFieldUpdateOperationsInput | string | null
    technical_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    target_audience?: NullableStringFieldUpdateOperationsInput | string | null
    internal_stakeholders?: NullableStringFieldUpdateOperationsInput | string | null
    consumer_insight?: NullableStringFieldUpdateOperationsInput | string | null
    rtb_features?: NullableStringFieldUpdateOperationsInput | string | null
    key_message?: NullableStringFieldUpdateOperationsInput | string | null
    value_proposition?: NullableStringFieldUpdateOperationsInput | string | null
    tone_of_voice?: NullableStringFieldUpdateOperationsInput | string | null
    market_competition?: NullableStringFieldUpdateOperationsInput | string | null
    inspirations?: NullableStringFieldUpdateOperationsInput | string | null
    past_communication?: NullableStringFieldUpdateOperationsInput | string | null
    touchpoints?: NullableStringFieldUpdateOperationsInput | string | null
    final_notes?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: BriefUpdateattachmentsInput | string[]
    links?: BriefUpdatelinksInput | string[]
    status?: EnumBriefStatusFieldUpdateOperationsInput | $Enums.BriefStatus
    progress?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    managers?: ManagerUpdateManyWithoutBriefsNestedInput
    organization?: OrganizationUpdateOneRequiredWithoutBriefsNestedInput
  }

  export type BriefUncheckedUpdateWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    project_name?: StringFieldUpdateOperationsInput | string
    project_type?: NullableEnumProjectTypeFieldUpdateOperationsInput | $Enums.ProjectType | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    business_goals?: NullableStringFieldUpdateOperationsInput | string | null
    communication_goals?: NullableStringFieldUpdateOperationsInput | string | null
    project_kpi?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    timeline_expectations?: NullableStringFieldUpdateOperationsInput | string | null
    project_budget?: NullableStringFieldUpdateOperationsInput | string | null
    agency_scope?: NullableStringFieldUpdateOperationsInput | string | null
    mandatories?: NullableStringFieldUpdateOperationsInput | string | null
    technical_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    target_audience?: NullableStringFieldUpdateOperationsInput | string | null
    internal_stakeholders?: NullableStringFieldUpdateOperationsInput | string | null
    consumer_insight?: NullableStringFieldUpdateOperationsInput | string | null
    rtb_features?: NullableStringFieldUpdateOperationsInput | string | null
    key_message?: NullableStringFieldUpdateOperationsInput | string | null
    value_proposition?: NullableStringFieldUpdateOperationsInput | string | null
    tone_of_voice?: NullableStringFieldUpdateOperationsInput | string | null
    market_competition?: NullableStringFieldUpdateOperationsInput | string | null
    inspirations?: NullableStringFieldUpdateOperationsInput | string | null
    past_communication?: NullableStringFieldUpdateOperationsInput | string | null
    touchpoints?: NullableStringFieldUpdateOperationsInput | string | null
    final_notes?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: BriefUpdateattachmentsInput | string[]
    links?: BriefUpdatelinksInput | string[]
    organization_id?: IntFieldUpdateOperationsInput | number
    status?: EnumBriefStatusFieldUpdateOperationsInput | $Enums.BriefStatus
    progress?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    managers?: ManagerUncheckedUpdateManyWithoutBriefsNestedInput
  }

  export type BriefUncheckedUpdateManyWithoutClientInput = {
    id?: IntFieldUpdateOperationsInput | number
    project_name?: StringFieldUpdateOperationsInput | string
    project_type?: NullableEnumProjectTypeFieldUpdateOperationsInput | $Enums.ProjectType | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    business_goals?: NullableStringFieldUpdateOperationsInput | string | null
    communication_goals?: NullableStringFieldUpdateOperationsInput | string | null
    project_kpi?: NullableStringFieldUpdateOperationsInput | string | null
    challenge?: NullableStringFieldUpdateOperationsInput | string | null
    timeline_expectations?: NullableStringFieldUpdateOperationsInput | string | null
    project_budget?: NullableStringFieldUpdateOperationsInput | string | null
    agency_scope?: NullableStringFieldUpdateOperationsInput | string | null
    mandatories?: NullableStringFieldUpdateOperationsInput | string | null
    technical_requirements?: NullableStringFieldUpdateOperationsInput | string | null
    target_audience?: NullableStringFieldUpdateOperationsInput | string | null
    internal_stakeholders?: NullableStringFieldUpdateOperationsInput | string | null
    consumer_insight?: NullableStringFieldUpdateOperationsInput | string | null
    rtb_features?: NullableStringFieldUpdateOperationsInput | string | null
    key_message?: NullableStringFieldUpdateOperationsInput | string | null
    value_proposition?: NullableStringFieldUpdateOperationsInput | string | null
    tone_of_voice?: NullableStringFieldUpdateOperationsInput | string | null
    market_competition?: NullableStringFieldUpdateOperationsInput | string | null
    inspirations?: NullableStringFieldUpdateOperationsInput | string | null
    past_communication?: NullableStringFieldUpdateOperationsInput | string | null
    touchpoints?: NullableStringFieldUpdateOperationsInput | string | null
    final_notes?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: BriefUpdateattachmentsInput | string[]
    links?: BriefUpdatelinksInput | string[]
    organization_id?: IntFieldUpdateOperationsInput | number
    status?: EnumBriefStatusFieldUpdateOperationsInput | $Enums.BriefStatus
    progress?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManagerUpdateWithoutBriefsInput = {
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumManagerStatusFieldUpdateOperationsInput | $Enums.ManagerStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutManagersNestedInput
  }

  export type ManagerUncheckedUpdateWithoutBriefsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    organization_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumManagerStatusFieldUpdateOperationsInput | $Enums.ManagerStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ManagerUncheckedUpdateManyWithoutBriefsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    organization_id?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumManagerStatusFieldUpdateOperationsInput | $Enums.ManagerStatus
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}