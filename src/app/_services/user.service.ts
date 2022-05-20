import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Procedure } from '../models/procedure';
import { Statut } from '../models/statut';
import { ProfilProc } from '../models/profilProc';
import { Scrum } from '../models/scrum';
import { Priorite } from '../models/priorite';
import { PrdSp } from '../models/prdSp';
import { Couverture } from '../models/couverture';
import { Produit } from '../models/Produit';

const API_URL = 'http://localhost:8080/api/test/';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  addUserUrl:string;
  getEmpUrl:string;
  deleteEmpUrl:string;
  getRoleUrl:string;
  updateEmpUrl:string;
  getProcs:string;
  deleteProc:string;
  createProc:string;
  getStatuts:string;
  createStatut:string;
  updateStatut:string;
  deleteStatut:string;
  getProfils:string;
  addProfil:string;
  updateProfil:string;
  deleteProfil:string;
  getUser:string;
  getScrum:string;
  addScrum:string;
  updateScrum:string;
  deleteScrum:string;
  getPriorites:string;
  updatePriorite:string;
  deletePriorite:string;
  addPriorite:string;
  getPrdSp:string;
  updatePrdSp:string;
  deletePrdSp:string;
  addPrdSp:string;
  getCouverture:string;
  updateCouverture:string;
  deleteCouverture:string;
  addCouverture:string;
  getProductUrl: string;
  createProductUrl: string;
  deleteProductUrl: string;
  getProcsById:string;
  updateProcedureURL: string;
  createProcForProduct:string;
  deleteProcFromProductURL:string;
  affecterAURL:string;
  addProcToProductURL:string;
  deleteFromAllProductsURL:string;
  constructor(private http: HttpClient) {
    this.addUserUrl='http://localhost:8080/api/auth/addUser';
    this.getEmpUrl='http://localhost:8080/api/auth/users';
    this.deleteEmpUrl='http://localhost:8080/api/auth/deleteUserById';
    this.getRoleUrl='http://localhost:8080/api/auth/roles';
    this.updateEmpUrl='http://localhost:8080/api/auth/updateUser';
    this.getProcs='http://localhost:8080/api/auth/procedures';
    this.deleteProc='http://localhost:8080/api/auth/deleteProcedure';
    this.createProc='http://localhost:8080/api/auth/createProcedure'
    this.getStatuts='http://localhost:8080/api/auth/getAllStatuts';
    this.createStatut='http://localhost:8080/api/auth/createStatut';
    this.updateStatut='http://localhost:8080/api/auth/updateStatut';
    this.deleteStatut='http://localhost:8080/api/auth/deleteStatut';
    this.getProfils='http://localhost:8080/api/auth/getAllProfils';
    this.addProfil='http://localhost:8080/api/auth/createProfil';
    this.updateProfil='http://localhost:8080/api/auth/updateProfil';
    this.deleteProfil='http://localhost:8080/api/auth/deleteProfil';
    
    this.getScrum='http://localhost:8080/api/auth/getAllScrums';
    this.addScrum='http://localhost:8080/api/auth/createScrum';
    this.updateScrum='http://localhost:8080/api/auth/updateScrum';
    this.deleteScrum='http://localhost:8080/api/auth/deleteScrum';

    this.getPriorites='http://localhost:8080/api/auth/getAllPriorites';
    this.addPriorite='http://localhost:8080/api/auth/createPriorite';
    this.updatePriorite='http://localhost:8080/api/auth/updatePriorite';
    this.deletePriorite='http://localhost:8080/api/auth/deletePriorite';

    this.getPrdSp='http://localhost:8080/api/auth/getAllPrdSp';
    this.addPrdSp='http://localhost:8080/api/auth/createPrdSp';
    this.updatePrdSp='http://localhost:8080/api/auth/updatePrdSp';
    this.deletePrdSp='http://localhost:8080/api/auth/deletePrdSp';

    this.getCouverture='http://localhost:8080/api/auth/getAllCouvertures';
    this.addCouverture='http://localhost:8080/api/auth/createCouverture';
    this.updateCouverture='http://localhost:8080/api/auth/updateCouverture';
    this.deleteCouverture='http://localhost:8080/api/auth/deleteCouverture';

    this.getProductUrl='http://localhost:8080/api/auth/products';
    this.deleteProductUrl='http://localhost:8080/api/auth/deleteProduct';
    this.createProductUrl='http://localhost:8080/api/auth/createProduct';

    this.getProcsById='http://localhost:8080/api/auth/getAllProcsByProductId';
    this.updateProcedureURL='http://localhost:8080/api/auth/updateProcedure';
    this.createProcForProduct='http://localhost:8080/api/auth/createProcedure';
    this.deleteProcFromProductURL='http://localhost:8080/api/auth/products';
    this.affecterAURL='http://localhost:8080/api/auth/addProcedure';
    this.addProcToProductURL='http://localhost:8080/api/auth';
    this.deleteFromAllProductsURL='http://localhost:8080/api/auth';
    
    

   
   }
   deleteFromAllProducts(procList:[]){
return this.http.delete(this.deleteFromAllProductsURL+'/deleteFromAllProducts/'+procList)
   }
   updateProductProc(procs:any,id:any){
     console.log(procs);
     
     return this.http.put(this.addProcToProductURL+'/updateProductProc/'+id,procs)
   }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

 

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.addUserUrl,user);
  }
  addStatut(statut:Statut): Observable<Statut>{
    return this.http.post<Statut>(this.createStatut,statut);
  }
  addProfi(profil:ProfilProc): Observable<ProfilProc>{
    return this.http.post<ProfilProc>(this.addProfil,profil);
  }
  addScru(scrum:Scrum): Observable<Scrum>{
    return this.http.post<Scrum>(this.addScrum,scrum);
  }
  addPri(pri:Priorite): Observable<Priorite>{
    return this.http.post<Priorite>(this.addPriorite,pri);
  }
  addPrd(prd:PrdSp): Observable<Priorite>{
    return this.http.post<Priorite>(this.addPrdSp,prd);
  }
  addCouv(couv:Couverture): Observable<Couverture>{
    return this.http.post<Couverture>(this.addCouverture,couv);
  }
  createProcedureForProduct(procedure:Procedure, id:number): Observable<Procedure>{
    return this.http.post<Procedure>(this.createProcForProduct+'/'+id,procedure);
  }
  createProduct(product:Produit): Observable<Produit> {
    return this.http.post<Produit>(this.createProductUrl,product);
  }
  affecterA(procedure:Procedure, id:number): Observable<Procedure> {
    return this.http.post<Procedure>(this.affecterAURL+'/'+id,procedure);
  }

 

  getAllProcs(): Observable<Procedure[]>{
    return this.http.get<Procedure[]>(this.getProcs);
  }
  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.getEmpUrl);
  }
  getAllRoles():Observable<Role[]>{
    return this.http.get<Role[]>(this.getRoleUrl);
  }
  getAllStatuts():Observable<Statut[]>{
    return this.http.get<Statut[]>(this.getStatuts);
  }

  getAllProfils():Observable<ProfilProc[]>{
    return this.http.get<ProfilProc[]>(this.getProfils);
  }
  getAllScrums():Observable<Scrum[]>{
    return this.http.get<Scrum[]>(this.getScrum);
  }
  getAllPriorites():Observable<Priorite[]>{
    return this.http.get<Priorite[]>(this.getPriorites);
  }
  getAllPrdSp():Observable<PrdSp[]>{
    return this.http.get<PrdSp[]>(this.getPrdSp);
  }
  getAllCouverture():Observable<Couverture[]>{
    return this.http.get<Couverture[]>(this.getCouverture);
  }
  getAllProducts():Observable<Produit[]>{
    return this.http.get<Produit[]>(this.getProductUrl);
  }

  getAllProcsById(id:number): Observable<Procedure[]>{
    return this.http.get<Procedure[]>(this.getProcsById+'/'+id);
  }

  deleteUser(id:number) : Observable<User> {
    return this.http.delete<User>(this.deleteEmpUrl+'/'+id);
  }
  deleteStatu(id:number): Observable<Statut>{
    return this.http.delete<Statut>(this.deleteStatut+'/'+id);
  }
  deleteProfi(id:number): Observable<ProfilProc>{
    return this.http.delete<ProfilProc>(this.deleteProfil+'/'+id);
  }
  deleteScru(id:number): Observable<Scrum>{
    return this.http.delete<Scrum>(this.deleteScrum+'/'+id);
  }
  deletePri(id:number): Observable<Priorite>{
    return this.http.delete<Priorite>(this.deletePriorite+'/'+id);
  }
 
  deletePrd(id:number): Observable<PrdSp>{
    return this.http.delete<PrdSp>(this.deletePrdSp+'/'+id);
  }
  deleteCouv(id:number): Observable<Couverture>{
    return this.http.delete<Couverture>(this.deleteCouverture+'/'+id);
  }

  deleteProduct(id:Number): Observable<Produit> {
    return this.http.delete<Produit>(this.deleteProductUrl+'/'+id);
  }


  updateUser(data:any,id:number) {
    return this.http.put<any>(this.updateEmpUrl+'/'+id,data);
  }
  updateStatu(data:any,id:number){
    return this.http.put<any>(this.updateStatut+'/'+id,data);
  }
  updateProfi(data:any,id:number){
    return this.http.put<any>(this.updateProfil+'/'+id,data);
  }
  updateScru(data:any,id:number){
    return this.http.put<any>(this.updateScrum+'/'+id,data);
  }

  updatePri(data:any,id:number){
    return this.http.put<any>(this.updatePriorite+'/'+id,data);
  }
  updatePrd(data:any,id:number){
    return this.http.put<any>(this.updatePrdSp+'/'+id,data);
  }
  updateCouv(data:any,id:number){
    return this.http.put<any>(this.updateCouverture+'/'+id,data);
  }
  updateProcedure(data:any,id:number){
    return this.http.put<any>(this.updateProcedureURL+'/'+id,data);
  }


  deleteProcedure(proc:Procedure[]) : Observable<Procedure> {
    return this.http.delete<Procedure>(this.deleteProc+'/'+proc);
  }
  createProcedure(proc:Procedure): Observable<Procedure> {
    return this.http.post<Procedure>(this.createProc,proc);
  }

  deleteProcFromProduct(proc:Procedure, productId:number) : Observable<Procedure> {
    return this.http.delete<Procedure>(this.deleteProcFromProductURL+'/'+productId+'/procs/'+proc.id);
  }

  
}
 

