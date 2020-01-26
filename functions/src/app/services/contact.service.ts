import { ServerError, Page } from "../models/helpers.models";
import firebase from "../config/database";
import { SchemaHelper } from "../helpers/schema.helper";
import { WriteResult } from '@google-cloud/firestore';
import { ContactSchema, ContactModel } from "../models/contact.model";
import { ResponseModel } from "../models/response.model";


export class ContactService {
    schema: SchemaHelper = new SchemaHelper(ContactSchema);
    private collection = firebase.firestore.collection("contacts");

    findById = async (id: string): Promise<ContactModel> => {
        const refUser = await this.collection.doc(id).get();
        if (refUser.exists) {
            const user = refUser.data();
            user.id = refUser.id;
            return user as ContactModel;
        }

        return null;
    };

    find = async (): Promise<Array<ContactModel>> => {
        try {
            const contacts = new Array<ContactModel>();
            const refContacts = await this.collection.get();
            refContacts.docs.forEach(doc => {
                if (doc.id !== 'QQ2xXY1Dy9JMZsgRu0ZA') {
                    const contact = doc.data() as ContactModel;
                    contacts.push(contact);
                }
            });
            return contacts;
        } catch (error) {
            throw new ServerError(error, 400);
        }
    };

    update = async (contacts: Array<ContactModel>): Promise<WriteResult | ResponseModel | ServerError> => {
        try {
            contacts.forEach(async (contact, i) => {
                await this.collection.doc(`${contact.id}`).set(contact, { merge: true });
            });
            return { syncSucessfull: true };
        } catch (err) {
            throw new ServerError(err, 400);
        }
    };
}
