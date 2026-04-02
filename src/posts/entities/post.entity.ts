import { Exclude, Expose } from 'class-transformer';

export class PostEntity {
  id: number;
  title: string;
  content: string;

  // Bu alanı API'den dışarı gizliyoruz (JSON'da görünmeyecek)
  @Exclude()
  authorId: number;

  @Exclude()
  isDeleted: boolean;

  // class-transformer'ın çalışması için dönen objeler bu Entity sınıfının bir kopyası (instance'ı) olmalıdır.
  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }

  // Veritabanında olmayan ama JSON çıktısına otomatik özel bir değer eklemek için @Expose() kullanabiliriz
  @Expose()
  get summary(): string {
    return this.content ? this.content.substring(0, 15) + '...' : '';
  }
}
