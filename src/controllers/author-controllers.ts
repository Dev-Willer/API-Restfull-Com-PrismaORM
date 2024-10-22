import { Request, Response } from "express";
import prismaBD from "../conexaobd";

export default class AuthorController {

    async create(req: Request, res: Response){
        const {id, name, email, bio, cpf, pais} = req.body

        try {
            const emailExists = await prismaBD.author.findUnique({
                where: {
                    email
                }
            })

            if(emailExists){
                res.status(400).json({message: 'O Email já está cadastrado.'})
                return;
            }

            const author = await prismaBD.author.create({
                data: {
                    name,
                    email,
                    bio,
                    cpf,
                    pais
                }
            })
            
            if(!email || !cpf){
                res.status(400).json({message: 'Todos os campos são obrigatórios.'})
                return;
            } else {
                res.status(201).json(author);
                return; 
            }

            
        } catch (error) {
            const erro = error as Error
            res.status(400).json({message: 'erro.message'});
            return;
        }
    }

    async list(req: Request, res: Response){

        const {id, name, email, bio, cpf, pais} = req.body

        try {

           const authors = await prismaBD.author.findMany() //selct * from authors 'where' bio (opcional)
           res.status(201).json(authors);
            
        } catch (error) {

            const erro = error as Error
            res.status(400).json({message: 'erro.message'});
            return;

        }
    }

    async show(req: Request, res: Response){
        const { id } = req.params

        try {


           const author = await prismaBD.author.findUnique({
                where: {
                    id: Number(id)
                }
           }) 

           if(!author){
                res.status(404).json({message: 'Autor não encontrado.'})
                return;
           } else {
                res.status(201).json(author);
           }   
            
        } catch (error) {

            const erro = error as Error
            res.status(400).json({message: 'erro.message'});
            return;
        }
    }

    async update(req: Request, res: Response){

        const { id } = req.params
        const { name, email, bio, cpf, pais } = req.body

        try {

            const author = await prismaBD.author.findUnique({
                where: {
                    id: Number(id)
                }
           }) 

           if(!author){
                res.status(404).json({message: 'Autor não encontrado.'})
                return;
           } else {
                res.status(201).json(author);
           }   

            const emailExists = await prismaBD.author.findUnique({
                where: {
                    email
                }
            })


            if(emailExists && emailExists.email !== email){
                res.status(400).json({message: 'O Email já existente.'})
                return;
            }


            await prismaBD.author.update({

                where: {
                    id: Number(id)
                },
                data: {
                    name,
                    email,
                    bio,
                    cpf,
                    pais
                }
            })

            res.status(200).send()
            return;
            
        } catch (error) {
            const erro = error as Error
            res.status(400).json({message: erro.message});
            return;
        }
    }

    async delete(req: Request, res: Response){
        const { id } = req.params

        try {

            const author = await prismaBD.author.findUnique({
                where: {
                    id: Number(id)
                }
           }) 

           if(!author){
                res.status(404).json({message: 'Autor não encontrado.'})
                return;
           }  

            await prismaBD.author.delete({

                where: {
                    id: Number(id)
                },
            })

            res.status(204).json({message: 'Usuário deletado com sucesso!'})
            return;
            
        } catch (error) {
            const erro = error as Error
            res.status(400).json({message: erro.message});
            return;
        }
    }

}