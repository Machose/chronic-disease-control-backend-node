"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _AbstractModel = require('../../core/AbstractModel'); var _AbstractModel2 = _interopRequireDefault(_AbstractModel);

 class MedicineModel extends _AbstractModel2.default {
   static __initStatic() {this.collectionName = 'medicine'}
} MedicineModel.__initStatic(); exports.default = MedicineModel;
