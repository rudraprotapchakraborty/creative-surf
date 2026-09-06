import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { CvInput, GeneratedCv, SavedCvDoc } from "@/lib/cv-types";

const COLLECTION_NAME = "cvs";

export async function saveCv(
  userId: string,
  userEmail: string,
  inputData: CvInput,
  cvData: GeneratedCv
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
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }));
}

/**
 * Fetches one CV for its owner, and only for its owner.
 *
 * There is deliberately no admin override here. This is the read that loads a
 * CV back into the builder to be edited, and someone's CV is their own document
 * to rewrite — an administrator overseeing the site does not need to author on
 * their behalf. Admins see every CV through `getAllCvs`, and can delete one
 * through `deleteCv`; that is the whole of the moderation they need.
 */
export async function getCvById(cvId: string, userId: string): Promise<SavedCvDoc | null> {
  const db = await getDb();
  const collection = db.collection(COLLECTION_NAME);

  let oid: ObjectId;
  try {
    oid = new ObjectId(cvId);
  } catch {
    return null;
  }

  // Ownership is part of the query rather than a check afterwards, so a CV
  // belonging to someone else is indistinguishable from one that never existed.
  const doc = await collection.findOne({ _id: oid, userId });
  if (!doc) return null;

  return {
    _id: doc._id.toString(),
    userId: doc.userId,
    userEmail: doc.userEmail,
    title: doc.title,
    inputData: doc.inputData,
    cvData: doc.cvData,
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
