import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { CvCoverage, CvInput, GeneratedCv, SavedCvDoc } from "@/lib/cv-types";

const COLLECTION_NAME = "cvs";

/**
 * The owner written on a CV built by someone who was not signed in.
 *
 * Every real owner id is an account's Mongo `_id`, so this can never collide
 * with one — which is the point. `getUserCvs`, `getCvById` and `deleteCv` all
 * filter on the caller's own id, so a CV stamped with this belongs to nobody
 * and is reachable only through the admin paths: a signed-out visitor gets
 * their CV saved, and no way to reopen or delete it afterwards.
 */
export const ANONYMOUS_USER_ID = "anonymous";

export async function saveCv(
  /** An account's `_id`, or `ANONYMOUS_USER_ID` when nobody was signed in. */
  userId: string,
  userEmail: string,
  inputData: CvInput,
  cvData: GeneratedCv,
  coverage: CvCoverage | null = null
): Promise<string> {
  const db = await getDb();
  const collection = db.collection(COLLECTION_NAME);

  const title = inputData.jobTitle?.trim() || cvData.headline || inputData.fullName || "Untitled CV";
  const now = new Date();

  const doc = {
    userId,
    userEmail: userEmail || "",
    title,
    inputData,
    cvData,
    coverage,
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(doc);
  return result.insertedId.toString();
}

export async function getUserCvs(userId: string): Promise<SavedCvDoc[]> {
  const db = await getDb();
  const collection = db.collection(COLLECTION_NAME);

  const docs = await collection
    .find({ userId })
    .sort({ updatedAt: -1 })
    .toArray();

  return docs.map((doc) => ({
    _id: doc._id.toString(),
    userId: doc.userId,
    userEmail: doc.userEmail,
    title: doc.title,
    inputData: doc.inputData,
    cvData: doc.cvData,
    coverage: doc.coverage ?? null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }));
}

export async function getAllCvs(): Promise<SavedCvDoc[]> {
  const db = await getDb();
  const collection = db.collection(COLLECTION_NAME);

  const docs = await collection
    .find({})
    .sort({ updatedAt: -1 })
    .toArray();

  return docs.map((doc) => ({
    _id: doc._id.toString(),
    userId: doc.userId,
    userEmail: doc.userEmail,
    title: doc.title,
    inputData: doc.inputData,
    cvData: doc.cvData,
    coverage: doc.coverage ?? null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }));
}

/**
 * Fetches one CV for its owner, or any CV for an admin.
 *
 * The admin override exists so a CV can be reopened in the builder from the
 * admin's list. It does not let an admin rewrite someone's document: nothing
 * here updates a stored CV, and generating from a reopened one inserts a fresh
 * CV owned by whoever pressed the button. The original is only ever read.
 */
export async function getCvById(
  cvId: string,
  userId: string,
  isAdmin = false
): Promise<SavedCvDoc | null> {
  const db = await getDb();
  const collection = db.collection(COLLECTION_NAME);

  let oid: ObjectId;
  try {
    oid = new ObjectId(cvId);
  } catch {
    return null;
  }

  // For a member, ownership is part of the query rather than a check after it,
  // so someone else's CV is indistinguishable from one that never existed.
  const doc = await collection.findOne(isAdmin ? { _id: oid } : { _id: oid, userId });
  if (!doc) return null;

  return {
    _id: doc._id.toString(),
    userId: doc.userId,
    userEmail: doc.userEmail,
    title: doc.title,
    inputData: doc.inputData,
    cvData: doc.cvData,
    coverage: doc.coverage ?? null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export async function deleteCv(cvId: string, userId: string, isAdmin = false): Promise<boolean> {
  const db = await getDb();
  const collection = db.collection(COLLECTION_NAME);

  let oid: ObjectId;
  try {
    oid = new ObjectId(cvId);
  } catch {
    return false;
  }

  const query = isAdmin ? { _id: oid } : { _id: oid, userId };
  const result = await collection.deleteOne(query);
  return result.deletedCount === 1;
}
