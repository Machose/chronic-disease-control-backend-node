"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _DayWeek = require('../models/DayWeek'); var _DayWeek2 = _interopRequireDefault(_DayWeek);

class DayWeekController {
  async index(req, res) {
    const daysWeek = await _DayWeek2.default.find();

    return res.status(200).json(daysWeek);
  }
}

exports. default = new DayWeekController();
