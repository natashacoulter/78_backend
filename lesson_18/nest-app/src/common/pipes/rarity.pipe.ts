import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

Injectable();
export class RarityPipe implements PipeTransform {
  private readonly allowedRarites = ['common', 'rare', 'epic', 'legendary'];

  transform(value: string) {
    if (!value) {
      throw new BadRequestException('Rarity is required');
    }

    if (!this.allowedRarites.includes(value)) {
      throw new BadRequestException(
        `Invalid rarity. Allowed values: ${this.allowedRarites.join(', ')}`,
      );
    }

    return value;
  }
}
