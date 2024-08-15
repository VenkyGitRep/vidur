import { eq, getTableColumns } from "drizzle-orm";
import { JobPosting, jobPostingsTable } from "~/server/db/schema";
import { NitroApp } from 'nitropack'
const nitroApp = useNitroApp()
const logger = nitroApp.logger
export default defineEventHandler(async (_) => {
  const database = await useDatabase();

  const {
    contents,
    owner,
    isPublished,
    totalApplicants,
    ...requiredColumns
  } = getTableColumns(jobPostingsTable);

  const postings = await database
    .select({
      ...requiredColumns,
    })
    .from(jobPostingsTable)
    .where(eq(jobPostingsTable.isPublished, true));

  if (IS_DEV) {
    logger.info("[PUBLIC] postings page found", postings.length, "postings.");
  }

  return (postings as JobPosting[]);
});
