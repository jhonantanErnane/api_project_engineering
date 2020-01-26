import { IController } from "../interface.controller";
import { Request, Response, NextFunction } from "express";
import { ContactService } from "../../services/contact.service";
import { ContactModel } from "../../models/contact.model";

export class ContactController implements IController {

    service = new ContactService;

    public static boostrap() {
        return new ContactController();
    }

    getAll(req: Request, res: Response, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getBkp = (req: Request, res: Response, next: NextFunction) => {
        this.service.find().then(resp => {
            res.send(resp);
        }).catch(err => {
            res.status(400).send(err);
        });
    }

    getById = (req: Request, res: Response, next: NextFunction) => {
        throw new Error("Method not implemented.");
    }

    create = (req: Request, res: Response, next: NextFunction) => {
        throw new Error("Method not implemented.");
    }

    update = (req: Request, res: Response, next: NextFunction) => {
        const contacts = req.body as Array<ContactModel>;

        this.service.update(contacts)
            .then(updatedUser => {
                res.send(updatedUser);
            }).catch(err => {
                res.status(400).send(err);
            });
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        throw new Error("Method not implemented.");
    }
}