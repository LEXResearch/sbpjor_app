import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { DescriptionPage } from '../pages/description/description';
import { FavoritePage } from '../pages/favorite/favorite';
import { TalkUsPage } from '../pages/talk-us/talk-us';
import { AboutPage } from '../pages/about/about';

//import { ContentServiceProvider } from '../providers/content-service/content-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    DescriptionPage,
    FavoritePage,
    TalkUsPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: HomePage, name: 'HomePage', segment: 'cronograma' },
        { component: SearchPage, name: 'SearchPage', segment: 'search' },
		{ component: DescriptionPage, name: 'DescriptionPage', segment: 'description' },
		{ component: FavoritePage, name: 'FavoritePage', segment: 'favorite' },
		{ component: TalkUsPage, name: 'TalkUsPage', segment: 'talkto' },
		{ component: AboutPage, name: 'AboutPage', segment: 'about' },
      ]
    }),
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    DescriptionPage,
    FavoritePage,
    TalkUsPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
  ]
})
export class AppModule {}
