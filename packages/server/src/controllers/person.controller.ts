
import { Router, Request, Response } from 'express';
import { PersonControllerBackEnd, InitServerIdentity } from '../convector';
import { Person, Attribute } from 'person-cc';
import { identityId } from '../env';

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const { id, name } = req.body;
        const personToCreate = new Person({ id, name });
        await PersonControllerBackEnd.create(personToCreate)
        res.status(201).send();
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const personToReturn = new Person(await PersonControllerBackEnd.get(id));
        res.send(personToReturn.toJSON());
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

router.post('/:id/add-attribute', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { attributeId, content } = req.body;

        let attribute = new Attribute(attributeId);
        attribute.certifierID = 'mit';
        attribute.content = {
            level: 'dummy',
            honours: 'high',
            description: 'Important title!'
        };
        attribute.issuedDate = Date.now();

        const attributeToAdd = new Attribute(attributeId);
        attributeToAdd.content = content;
        attributeToAdd.issuedDate = Date.now();

        // Get the identity the server is using right now
        attributeToAdd.certifierID = identityId;

        await PersonControllerBackEnd.addAttribute(id, attributeToAdd);

        const personToReturn = new Person(await PersonControllerBackEnd.get(id));
        res.send(personToReturn.toJSON());
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

export const PersonExpressController: Router = router;