type RecordDataType = string | number | undefined;

interface FieldSet {
  [key: string]: RecordDataType;
}

interface DatabaseRecord {
  [key: string]: FieldSet;
}

export type { RecordDataType, FieldSet, DatabaseRecord };
