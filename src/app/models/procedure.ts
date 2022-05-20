import { Couverture } from "./couverture";
import { PrdSp } from "./prdSp";
import { Priorite } from "./priorite";
import { ProfilProc } from "./profilProc";
import { Scrum } from "./scrum";
import { Statut } from "./statut";

export class Procedure{
   
   
    id: number;
    name : string='';   

    profilProcedure : ProfilProc ; 
    traitement: string;
    sprint:string;
    jiraDev:string;
    
    quiDev:string;
    jiraQa:string;
    quiQa:string;
    jiraJas:string;
    commentaireJas:string;
    dateMAJ:string;
    commentaireMig:string;
    couverture:Couverture;
    statutDev:Statut;
    statutQa:Statut;
    statutTrad:Statut;
    statutJas:Statut;
    scrum:Scrum;
    prdSp:PrdSp;
    prio:Priorite;
    prioJas:Priorite;

    
    checked: boolean;


 
  constructor() { }
}