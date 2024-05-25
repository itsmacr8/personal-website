import { Collaborator, Attachment } from "airtable";

type DatabaseRecordType =
  | string
  | number
  | boolean
  | Collaborator
  | readonly Collaborator[]
  | readonly string[]
  | readonly Attachment[]
  | undefined;

interface DatabaseRecord {
  [key: string]: DatabaseRecordType
}

export type { DatabaseRecordType, DatabaseRecord }
