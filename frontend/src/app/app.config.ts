import { ApplicationConfig, provideZoneChangeDetection, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    
    provideHttpClient(),
    /*provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({
          uri: 'http://backend:5000/graphql'
          //uri: 'http://localhost:8081/graphql', // here backend
        }),
        cache: new InMemoryCache(),
      };
    }),*/


    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({
          uri: environment.graphqlUri,
        }),
        cache: new InMemoryCache(),
      };
    }),
  ]
};
