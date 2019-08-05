import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string('Insira um nome válido'),
      email: Yup.string().email('Insira um email válido'),
      oldPassword: Yup.string()
        .min(6, 'A senha deve ter 6 ou mais caracteres')
        .when('password', (password, field) =>
          password ? field.required('A senha antiga deve ser informada') : field
        ),
      password: Yup.string('Insira uma senha válida').min(
        6,
        'A senha deve ter 6 ou mais caracteres'
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required('Insira a confirmação da senha')
              .oneOf(
                [Yup.ref('password')],
                'As senhas informadas são diferentes'
              )
          : field
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
