import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Note: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  User: a
    .model({
      email: a.string().required(),
      name: a.string().required(),
      role: a.string().default("employee"), // employee, manager, admin
      department: a.string(),
      isActive: a.boolean().default(true),
      createdAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.authenticated().to(["create", "read", "update", "delete"]),
    ]),

  TeamNote: a
    .model({
      title: a.string().required(),
      content: a.string().required(),
      department: a.string(),
      createdBy: a.string(),
      createdAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.owner().to(["create", "update", "delete"]),
      allow.group("managers").to(["create", "update", "delete"]),
      allow.group("admins").to(["create", "read", "update", "delete"]),
    ]),

  Announcement: a
    .model({
      title: a.string().required(),
      content: a.string().required(),
      priority: a.string().default("normal"), // low, normal, high, urgent
      createdBy: a.string(),
      createdAt: a.datetime(),
    })
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.group("admins").to(["create", "read", "update", "delete"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
