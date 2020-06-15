"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup); //como o yup n possui um export defaut em nenhum lugar, a sintax import * as Yup possibilita que o app armazena tudo que esta dentro do arquivo yup dentro da variavel Yup

var _MedicineRoutine = require('../models/MedicineRoutine'); var _MedicineRoutine2 = _interopRequireDefault(_MedicineRoutine);





class MedicineRoutineController {
  //Create user
  async store(req, res) {
    //lidando um objeto, que tenha formato ...
    const schema = Yup.object().shape({
      medicine_id: Yup.string().required(),
      day_week_id: Yup.string().required(),
      schedule: Yup.string().required()
    });

    //pega o schema e passa o req.body para ver se ele esta de acordo com as regras
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { medicine_id, day_week_id, schedule } = req.body;

    const medicineRoutine = await _MedicineRoutine2.default.create({
      medicine_id,
      day_week_id,
      schedule,
      user_id: req.userId
    });

    return res.status(201).json(medicineRoutine);
  }

  async index(req, res) {
    const { day_week_id } = req.query;

    const medicineRoutines = await _MedicineRoutine2.default.find({
      day_week_id,
      user_id: req.userId
    });

    return res.status(200).json(medicineRoutines);
  }
}

exports. default = new MedicineRoutineController();
