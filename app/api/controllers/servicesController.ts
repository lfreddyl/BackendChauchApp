import mongoose from "mongoose";
import { interfaceServicio } from "../interfaces/interfaceServicio";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
  sms_update,
  sms_create,
  sms_get,
  sms_notfound,
  sms_delet,
} from "../responses/responseServices";
import { Request, Response } from "express";
import publicacionService from "../services/publicacionService";


import e = require("express");

export class publicacionController {
  private publicacion_service: publicacionService = new publicacionService();

  public create_publicacion(req: Request, res: Response) {

    console.log(req.body)
    if (
      req.body

    ) {
      const publicacion_params: interfaceServicio = {
        nombre: req.body.nombre,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        disponibilidad: req.body.disponibilidad,
        direccion:req.body.direccion,
        fecha: req.body.fecha,
        id_usuario: req.body.id_usuario
      };
      this.publicacion_service.createPublicacion(
        publicacion_params,
        (err: any, publicacion_data: any) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(sms_create, publicacion_data, res);
          }
        }
      );
    } else {
      // error response if some fields are missing in request body
      insufficientParameters(res);
    }
  }

  public get_publicacion(req: Request, res: Response) {
    if (req.params.id) {
      const query = { _id: mongoose.Types.ObjectId(req.params.id) };
      const order_filter = { fecha: -1 };
      const queryagregate = [
        {
          $lookup: {
            from: "usuarios",
            localField: "id_usuario",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        { $match: query },
        {
          $project: {
            _id: 1,
            descripcion: 1,
            img: 1,
            cantidad: 1,
            direccion: 1,
            fecha: 1,
            estado: 1,
            residuos: 1,
            nombres: "$user.nombres",
            apellidos: "$user.apellidos",
            imguser: "$user.img",
            _iduser: "$user._id",
          },
        },
      ];
      this.publicacion_service.filterByUser(
        queryagregate,
        order_filter,
        (err: any, publicacion_data: any) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(sms_get, publicacion_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
  //servicio para obtener los tipos de publicacions con imagenes
  public get_PublicacionByUser(req: Request, res: Response) {
    if (req.params.idUser) {
      const query = { id_usuario: mongoose.Types.ObjectId(req.params.idUser) };
      const queryagregate = [
        {
          $lookup: {
            from: "usuarios",
            localField: "id_usuario",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        { $match: query },
        {
          $project: {
            _id: 1,
            descripcion: 1,
            img: 1,
            cantidad: 1,
            direccion: 1,
            fecha: 1,
            estado: 1,
            residuos: 1,
            nombres: "$user.nombres",
            apellidos: "$user.apellidos",
            imguser: "$user.img",
            _iduser: "$user._id",
          },
        },
      ];
      const queryOrder = { fecha: -1 };
      this.publicacion_service.filterByUser(
        queryagregate,
        queryOrder,
        (err: any, store_data: any) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(sms_get, store_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
  public get_PublicacionByDescripcion(req: Request, res: Response) {
    if (req.params.cadenaBusqueda) {
      const query = {
        descripcion: { $regex: req.params.cadenaBusqueda, $options: "i" },
      };
      const queryagregate = [
        {
          $lookup: {
            from: "usuarios",
            localField: "id_usuario",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        { $match: query },
        {
          $project: {
            _id: 1,
            descripcion: 1,
            img: 1,
            cantidad: 1,
            direccion: 1,
            fecha: 1,
            estado: 1,
            residuos: 1,
            nombres: "$user.nombres",
            apellidos: "$user.apellidos",
            imguser: "$user.img",
            _iduser: "$user._id",
          },
        },
      ];
      const queryOrder = { fecha: -1 };
      this.publicacion_service.filterByUser(
        queryagregate,
        queryOrder,
        (err: any, store_data: any) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(sms_get, store_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public get_PublicacionByCategoria(req: Request, res: Response) {
    if (req.params.cadenaBusqueda) {
      const query = {
        'residuos.descripcion': { $regex: req.params.cadenaBusqueda, $options: "i" },
      };
      const queryagregate = [
        {
          $lookup: {
            from: "usuarios",
            localField: "id_usuario",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        { $match: query },
        {
          $project: {
            _id: 1,
            descripcion: 1,
            img: 1,
            cantidad: 1,
            direccion: 1,
            fecha: 1,
            estado: 1,
            residuos: 1,
            nombres: "$user.nombres",
            apellidos: "$user.apellidos",
            imguser: "$user.img",
            _iduser: "$user._id",
          },
        },
      ];
      const queryOrder = { fecha: -1 };
      this.publicacion_service.filterByUser(
        queryagregate,
        queryOrder,
        (err: any, store_data: any) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(sms_get, store_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
  
  public find_publicacionByEstado(req: Request, res: Response) {
    if (req.params.estado) {
      const query = { estado: req.params.estado };
      const queryagregate = [
        {
          $lookup: {
            from: "usuarios",
            localField: "id_usuario",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        { $match: query },
        {
          $project: {
            _id: 1,
            descripcion: 1,
            img: 1,
            cantidad: 1,
            direccion: 1,
            fecha: 1,
            estado: 1,
            residuos: 1,
            nombres: "$user.nombres",
            apellidos: "$user.apellidos",
            imguser: "$user.img",
            _iduser: "$user._id",
          },
        },
      ];
      const queryOrder = { fecha: -1 };
      this.publicacion_service.filterByUser(
        queryagregate,
        queryOrder,
        (err: any, publicacion_data: any) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse(sms_get, publicacion_data, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public get_AllPublicacion(req: Request, res: Response) {
    const query = { estado: "pendiente" };
    const PAGE_SIZE = 5;
    const page = parseInt(req.params.page);
    const skip = (page - 1) * PAGE_SIZE;
    const order_filter = { fecha: -1 };
    const queryagregate = [
      {
        $lookup: {
          from: "usuarios",
          localField: "id_usuario",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $match: query },
      {
        $project: {
          _id: 1,
          descripcion: 1,
          img: 1,
          cantidad: 1,
          direccion: 1,
          fecha: 1,
          estado: 1,
          residuos: 1,
          nombres: "$user.nombres",
          apellidos: "$user.apellidos",
          imguser: "$user.img",
          _iduser: "$user._id",
        },
      },
      { $skip: (page - 1) * PAGE_SIZE },
      { $limit: PAGE_SIZE },

    ];

    this.publicacion_service.filterByUser(
      queryagregate,
      order_filter,
      (err: any, publicacion_data: any) => {
        if (err) {
          mongoError(err, res);
        } else {
          successResponse(sms_get, publicacion_data, res);
        }
      }
    );
  }
  
  public countPublicacion(req: Request, res: Response) {
    const query = { disponibilidad: true };
    const order_filter={_id:1}
    const queryagregate = [
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
       }
      }
    ];

    this.publicacion_service.count(
      queryagregate,
      
      (err: any, publicacion_data: any) => {
        if (err) {
          mongoError(err, res);
        } else {
          successResponse(sms_get, publicacion_data, res);
        }
      }
    );
  }
  
//optener publicaciones
  public getPublicacion(req: Request, res: Response) {
    const query = { disponibilidad: true };
    const order_filter={_id:1}
    const queryagregate = [
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
       }
      }
    ];

    this.publicacion_service.getPublicacion(
  
      
      (err: any, publicacion_data: any) => {
        if (err) {
          mongoError(err, res);
        } else {
          successResponse(sms_get, publicacion_data, res);
        }
      }
    );
  }
  
  

  public update_publicacion(req: Request, res: Response) {
    if (
      req.body

    ) {
      const publicacion_filter = { _id: req.params.id };
      this.publicacion_service.filterPublicacion(
        publicacion_filter,
        (err: any, publicacion_data: any) => {
          if (err) {
            mongoError(err, res);
          } else if (publicacion_data) {
            const publicacion_params: interfaceServicio = {
              _id: req.params.id,
              nombre: req.body.nombre
                ? req.body.nombre
                : publicacion_data.nombre,
              categoria: req.body.categoria
                ? req.body.categoria
                : publicacion_data.categoria,
              descripcion: req.body.descripcion
                ? req.body.descripcion
                : publicacion_data.descripcion,
              precio: req.body.precio ? req.body.precio : publicacion_data.precio,
              disponibilidad: req.body.disponibilidad ? req.body.disponibilidad : publicacion_data.disponibilidad,
              direccion:req.body.direccion ? req.body.direccion : publicacion_data.direccion,
              fecha: req.body.fecha
                ? req.body.fecha
                : publicacion_data.fecha,
              id_usuario: req.body.id_usuario
                ? req.body.id_usuario
                : publicacion_data.id_usuario,

            };
            this.publicacion_service.updatePublicacion(
              publicacion_params,
              (err: any) => {
                if (err) {
                  mongoError(err, res);
                } else {
                  successResponse(sms_update, null, res);
                }
              }
            );
          } else {
            failureResponse(sms_notfound, null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public delete_publicacion(req: Request, res: Response) {
    if (req.params.id) {
      this.publicacion_service.deletePublicacion(
        req.params.id,
        (err: any, delete_details: any) => {
          if (err) {
            mongoError(err, res);
          } else if (delete_details.deletedCount !== 0) {
            successResponse(sms_delet, null, res);
          } else {
            failureResponse(sms_notfound, null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
}
