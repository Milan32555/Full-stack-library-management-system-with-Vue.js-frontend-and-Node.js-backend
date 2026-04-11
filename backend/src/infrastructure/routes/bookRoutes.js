import { Router } from "express";

export default function bookRoutes(controller) {
  const router = Router();

  router.post  ("/books",         (req, res) => controller.create(req, res));
  router.get   ("/books",         (req, res) => controller.getAll(req, res));
  router.get   ("/books/:isbn",   (req, res) => controller.getByIsbn(req, res));
  router.put   ("/books/:id",     (req, res) => controller.update(req, res));
  router.delete("/books/:id",     (req, res) => controller.delete(req, res));

  return router;
}
