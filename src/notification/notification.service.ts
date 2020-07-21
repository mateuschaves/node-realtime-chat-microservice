import { Injectable } from '@nestjs/common';
import { SendNotificationDto } from './dto/send-notification.dto';

import axios from 'axios';

@Injectable()
export class NotificationService {
  async sendNotification(sendNotification: SendNotificationDto): Promise<any> {
    const { content, title, group, player_id, avatar } = sendNotification;

    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Basic ${process.env.ONESIGNAL_TOKEN}`,
    };

    const body = {
      app_id: process.env.ONESIGNAL_APP_ID,
      contents: { pt: content, en: content },
      headings: { pt: title, en: title },
      include_player_ids: [player_id],
      android_group: String(group),
      large_icon: avatar,
    };

    return axios.post(`${process.env.ONESIGNAL_API_URL}notifications`, body, {
      headers,
    });
  }
}
