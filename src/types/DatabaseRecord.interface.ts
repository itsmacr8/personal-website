interface FieldSet {
  [key: string]: string | number | undefined;
}

interface DatabaseRecord {
  [key: string]: FieldSet
}

export type { FieldSet, DatabaseRecord }
