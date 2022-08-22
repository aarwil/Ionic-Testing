import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData,doc, docData, addDoc, deleteDoc } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';
// import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
export interface Note {
  id? : string;
  tittle: string;
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getNotes():Observable<Note[]>{
    const notesRef = collection(this.firestore, 'notes');
    return collectionData(notesRef,{ idField:'id'}) as Observable<Note[]>;
  }

  getNoteById(id): Observable<Note>{
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef,{ idField:'id'}) as Observable<Note>;
  }

  addNote(note: Note){
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note);
  }
  deleteNote(note: Note){
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return deleteDoc(noteDocRef);
  }
  updateNote(note: Note){
    const noteDocRef = doc(this.firestore, `notes/${note.id}`);
    return updateDoc(noteDocRef, {tittle: note.tittle, text: note.text});
  }
}
