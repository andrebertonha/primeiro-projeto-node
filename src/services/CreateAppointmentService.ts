import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 [x] recebimento de informacoes
 [/] tratativa de erros e excessoes
 [x] acesso ao repositorio
 */

interface Request {
  provider: string;
  date: Date;
}

/**
  dependency inversion (SOLID)
  Single Responsability Principle
  dependency inversion principle
 */

class CreateAppointmentService {



  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);


    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if(findAppointmentInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
