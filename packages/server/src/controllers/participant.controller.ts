import { Router, Request, Response } from 'express';
import { ParticipantControllerBackEnd, InitServerIdentity } from '../convector';

const router: Router = Router();

// Check if the server identity has been enrolled successfully
InitServerIdentity();

router.get('/:id', async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        res.send(await ParticipantControllerBackEnd.get(id));
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).send(err);
    }
});

export const ParticipantExpressController: Router = router;
