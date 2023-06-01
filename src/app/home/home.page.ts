import {
  AfterViewInit,
  Component,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  DomController,
  IonContent,
  RefresherCustomEvent,
} from '@ionic/angular';

import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild(IonContent)
  ionContent: IonContent | undefined;
  private scrollElement: HTMLElement | undefined;


  private data = inject(DataService);
  private domController = inject(DomController);
  private renderer = inject(Renderer2);
  constructor() {}

  async ngAfterViewInit(): Promise<void> {
    this.scrollElement = await this.ionContent?.getScrollElement();
    this.domController.write(() => {
      this.renderer.setAttribute(this.scrollElement, 'cdk-scrollable', '');
    });
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  drop(event: any) {
    const ddEvent = event as CdkDragDrop<Message[]>;
    moveItemInArray(
      this.getMessages(),
      event.previousIndex,
      event.currentIndex
    );
  }
}
