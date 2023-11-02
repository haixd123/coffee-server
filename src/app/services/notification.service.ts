// import { NzConfigService, NzNotificationService } from 'ng-zorro-antd';
import {NzConfigService, NzNotificationService} from 'ng-zorro-antd';
import {Injectable} from '@angular/core';

@Injectable()
export class NotificationService {
  constructor(
    private notification: NzNotificationService,
    private readonly nzConfigService: NzConfigService
  ) {
    this.nzConfigService.set('notification', {
      nzMaxStack: 1
    });
  }

  showMessage(type: string, message: string) {
    this.notification.create(
      type,
      message,
      null
    );
  }

  // showNotification(type: string, message: string, widthClazz?, duration?: number) {
  //   this.notification.create(
  //     type,
  //     message,
  //     null,
  //     {
  //       nzStyle: {
  //         fontWeight: 'lighter',
  //         fontSize: 'larger'
  //       },
  //       nzClass: {
  //         width: widthClazz
  //       },
  //       nzDuration: duration ? duration : 3000,
  //     }
  //   );
  // }
  //
  // showNotificationError(type: string, message: string) {
  //   this.notification.blank(
  //     'ERROR',
  //     message,
  //     {
  //       nzStyle: {
  //         backgroundColor: 'white',
  //         color: 'red',
  //       },
  //     }
  //   );
  // }
  //
  // showNotificationcustom(type: string, message: string) {
  //   this.notification.success(
  //     'Hoàn tất tải lên.',
  //     message,
  //     {
  //       nzStyle: {
  //         backgroundColor: 'white',
  //         color: 'black',
  //         width: '800px',
  //         padding: '50px'
  //       },
  //     }
  //   )
  //     ;
  // }
}
