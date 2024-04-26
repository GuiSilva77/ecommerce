import vine from "@vinejs/vine";

export const pesquisaComercianteValidator = vine.compile(
    vine.number().positive().withoutDecimals()
)
