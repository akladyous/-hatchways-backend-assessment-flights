class AppController {

    root(req, res, next) {
        res.status(200).json({ message: 'home page' })
    };
    ping(req, res, next) {
        console.log('this : ', this)
        res.sendStatus(200);
    };
};

export default AppController;

