import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SystemMessage } from '../_models/message';
import { MessagesService } from '../_services/messages.service';
import { NotificationService } from '../_services/notification.service';
import { MessageDialogComponent } from './message-dialog.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: SystemMessage[] = [];
  showAll: boolean = true;
  loading: boolean = false;

  constructor(
    private messagesService: MessagesService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.messagesService.getMessages(this.showAll).subscribe({
      next: (data) => {
        this.messages = this.sortMessages(data || []);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onShowAllChange(): void {
    this.loadMessages();
  }

  private sortMessages(list: SystemMessage[]): SystemMessage[] {
    return list.slice().sort((a, b) => {
      // 1. active first (true before false)
      if (a.active !== b.active) {
        return a.active ? -1 : 1;
      }
      // 2. dateTo descending
      const timeA = new Date(a.dateTo).getTime();
      const timeB = new Date(b.dateTo).getTime();
      return timeB - timeA;
    });
  }

  onView(message: SystemMessage): void {
    this.notificationService.alert(message.content, message.title);
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe((result: SystemMessage | undefined) => {
      if (result) {
        this.messagesService.createMessage(result).subscribe({
          next: () => {
            this.notificationService.success('Mensaje creado correctamente');
            this.loadMessages();
          }
        });
      }
    });
  }

  onUpdate(message: SystemMessage): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '500px',
      data: { ...message }
    });

    dialogRef.afterClosed().subscribe((result: SystemMessage | undefined) => {
      if (result && message.id !== undefined) {
        this.messagesService.updateMessage(message.id, result).subscribe({
          next: () => {
            this.notificationService.success('Mensaje actualizado correctamente');
            this.loadMessages();
          }
        });
      }
    });
  }

  onDelete(message: SystemMessage): void {
    if (message.id === undefined) return;

    this.notificationService.confirmation(
      '¿Está seguro de eliminar este mensaje?',
      () => {
        this.messagesService.deleteMessage(message.id!).subscribe({
          next: () => {
            this.notificationService.success('Mensaje eliminado correctamente');
            this.loadMessages();
          }
        });
      },
      'Eliminar Mensaje'
    );
  }
}
