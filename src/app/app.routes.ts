import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),

        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./views/dashboard/dashboard.component'),
            },
            {
                path: 'platos',
                loadComponent: () => import('./views/list-menu/list-menu.component'),
            },
            {
                path: 'venta',
                loadComponent: () => import('./views/list-sale/list-sale.component'),
            },
            {
                path: 'reporte',
                loadComponent: () => import('./views/report-daily/report-daily.component'),
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
