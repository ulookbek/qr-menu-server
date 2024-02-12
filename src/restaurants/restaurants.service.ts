import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { restaurantNotFound } from './constants';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}
  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return this.restaurantRepository.save(createRestaurantDto);
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  async findOne(id: number, lang?: string) {
    try {
      return await this.restaurantRepository.findOneOrFail({
        where: { id },
      });
    } catch (e) {
      throw new NotFoundException(restaurantNotFound[lang || 'en']);
    }
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}