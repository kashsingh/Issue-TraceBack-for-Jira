import Resolver from "@forge/resolver";
import { storage, SortOrder } from "@forge/api";

const resolver = new Resolver();

resolver.define("getAllLogs", async (req) => {
  const auditLog = await fetchDeletedIssuesLog();
  return auditLog;
});

export const handler = resolver.getDefinitions();

export async function run(event) {
  const now = new Date().toISOString();
  const {
    key: issuekey,
    fields: {
      summary,
      reporter: { accountId: reporter },
      created,
    },
  } = event.issue;
  const { accountId: actor } = event.associatedUsers[0];

  const issueDetails = {
    issuekey,
    summary,
    reporter,
    actor,
    created,
    deletedOn: now,
  };
  await addDeletedIssueLog(`${now}_${event.issue.id}`, issueDetails);
  return true;
}

export const addDeletedIssueLog = async (logKey, issueDetails) => {
  try {
    await storage.entity("deleted-issues").set(logKey, issueDetails);
  } catch (e) {
    console.error("Error saving the log, ", e);
  }
};

export const fetchDeletedIssuesLog = async () => {
  try {
    const response = await storage
      .entity("deleted-issues")
      .query()
      .index("by-key")
      .limit(100)
      .sort(SortOrder.DESC)
      .getMany();
    return response;
  } catch (e) {
    console.error("Error fetching the audit logs, ", e);
  }
};
