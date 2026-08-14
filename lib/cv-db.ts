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

export async function getCvById(cvId: string, userId: string, isAdmin = false): Promise<SavedCvDoc | null> {
  const db = await getDb();
  const collection = db.collection(COLLECTION_NAME);

  let oid: ObjectId;
  try {
    oid = new ObjectId(cvId);
  } catch {
    return null;
  }

  const query = isAdmin ? { _id: oid } : { _id: oid, userId };
  const doc = await collection.findOne(query);
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
