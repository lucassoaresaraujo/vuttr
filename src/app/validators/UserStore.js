import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string('Insira um nome válido').required(
        'O nome deve ser informado'
      ),
      email: Yup.string()
        .email('Insira um email válido')
        .required('O email deve ser informado'),
      password: Yup.string()
        .required('A senha deve ser informada')
        .min(6, 'A senha deve ter 6 ou mais caracteres'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
