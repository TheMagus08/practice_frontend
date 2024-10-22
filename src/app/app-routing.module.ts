import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth/guard/auth.guard';
import { GestionarUsuariosComponent } from './components/gestionar-usuarios/gestionar-usuarios.component';
import { GestionarOfertasComponent } from './components/gestionar-ofertas/gestionar-ofertas.component';
import { CrearOfertasComponent } from './components/crear-ofertas/crear-ofertas.component';
import { OfertasLaboralesComponent } from './components/ofertas-laborales/ofertas-laborales.component';
import { OfertasLaboralesUserComponent } from './components/ofertas-laborales-user/ofertas-laborales-user/ofertas-laborales-user.component';
const routes: Routes = [
  { path: 'perfil', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'perfil/:id', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'gestionar-ofertas', component: GestionarOfertasComponent , canActivate: [authGuard] },
  { path: 'crear-ofertas', component: CrearOfertasComponent , canActivate: [authGuard] },
  { path: 'oferta/:id', component: CrearOfertasComponent , canActivate: [authGuard] },
  { path: 'gestionar-usuarios', component: GestionarUsuariosComponent , canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'ofertas-laborales', component: OfertasLaboralesComponent , canActivate: [authGuard] },
  { path: 'oferta-detalle/:id', component: OfertasLaboralesUserComponent , canActivate: [authGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }// Redirige cualquier ruta no encontrada al login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
