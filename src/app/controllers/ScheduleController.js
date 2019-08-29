import { startOfDay, endOfDay, parseISO  } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController{
  async index(req, res){
    const checkUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true
      }
    })
    if(!checkUserProvider){
      return res.status(401).json({error: 'User is not a prodider'});
    }
    const { date } = req.query;
    const parsedDate = parseISO(date);
    //"2020-09-22T:00:00:00-03:00"
    // startOfDay - pega o comeco do dia(00:00:00), passado no parsedDate ... formato AAAA-MM-DD
    // endOfDay - pega o final (232:59:59)


const appointments = await Appointment.findAll({
  where: {
    provider_id: req.userId,
    canceled_at: null,
    date: {
      [Op.between]: [
        startOfDay(parsedDate),
        endOfDay(parsedDate)
      ]
    },
  },
  order: ['date']
})

return res.json(appointments)
}
}

export default new ScheduleController();
