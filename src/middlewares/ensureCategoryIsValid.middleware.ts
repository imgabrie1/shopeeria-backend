import { Request, Response, NextFunction } from "express";

const allowedCategories = [
  "Roupas Femininas",
  "Casa e Construção",
  "Roupas Plus Size",
  "Beleza",
  "Roupas Masculinas",
  "Sapatos Femininos",
  "Sapatos Masculinos",
  "Moda Infantil",
  "Acessórios de Moda",
  "Relógios",
  "Celulares e Dispositivos",
  "Esportes e Lazer",
  "Eletroportáteis",
  "Brinquedos e Hobbies",
  "Automóveis",
  "Saúde",
  "Motocicletas",
  "Áudio",
  "Bolsas Femininas",
  "Bolsas Masculinas",
  "Animais Domésticos",
  "Papelaria",
  "Computadores e Acessórios",
  "Alimentos e Bebidas",
  "Jogos e Consoles",
  "Câmeras e Drones",
  "Viagens e Bagagens",
  "Livros e Revistas",
];

export function ensureCategoryIsValidMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { category } = req.body;

  if (
    !category ||
    !Array.isArray(category) ||
    !category.every((cat) => allowedCategories.includes(cat))
  ) {
    return res.status(400).json({ message: "Categoria inválida." });
  }

  next();
}
