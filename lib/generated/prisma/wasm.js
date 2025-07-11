
/* !!! This is code generated by Prisma. Do not edit directly. !!!
/* eslint-disable */

Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.11.0
 * Query Engine version: 9c30299f5a0ea26a96790e13f796dc6094db3173
 */
Prisma.prismaVersion = {
  client: "6.11.0",
  engine: "9c30299f5a0ea26a96790e13f796dc6094db3173"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.OrganizationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  ai_support: 'ai_support',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ManagerScalarFieldEnum = {
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

exports.Prisma.ClientScalarFieldEnum = {
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

exports.Prisma.BriefScalarFieldEnum = {
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

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.ManagerStatus = exports.$Enums.ManagerStatus = {
  active: 'active',
  invited: 'invited',
  deactivated: 'deactivated'
};

exports.UserRole = exports.$Enums.UserRole = {
  admin: 'admin',
  manager: 'manager'
};

exports.ClientStatus = exports.$Enums.ClientStatus = {
  active: 'active',
  invited: 'invited',
  deactivated: 'deactivated'
};

exports.ProjectType = exports.$Enums.ProjectType = {
  General: 'General',
  Motion: 'Motion',
  Events: 'Events',
  Web: 'Web',
  UX_UI_Website: 'UX_UI_Website',
  Event_Tradeshow: 'Event_Tradeshow',
  Video_Animation: 'Video_Animation',
  Digital_Paid_Campaign: 'Digital_Paid_Campaign'
};

exports.BriefStatus = exports.$Enums.BriefStatus = {
  New: 'New',
  Sent: 'Sent',
  Shared: 'Shared',
  Draft: 'Draft',
  Stale: 'Stale'
};

exports.Prisma.ModelName = {
  Organization: 'Organization',
  Manager: 'Manager',
  Client: 'Client',
  Brief: 'Brief'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
