import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string('Insira um titulo válido').required(
        'O titulo deve ser informado'
      ),
      link: Yup.string().required('O link deve ser informado'),
      description: Yup.string().required('A descrição deve ser informada'),
      tags: Yup.array()
        .required('As tags devem ser informadas')
        .of(Yup.string()),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: error.inner });
  }
};
