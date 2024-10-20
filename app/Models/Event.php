<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property array<int> $users
 */
class Event extends Model
{

    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'title',
        'description',
        'start',
        'users'
    ];

    protected $casts = [
        'start' => 'datetime'
    ];

    public function getUsersAttribute()
    {
        return User::whereIn('id', json_decode($this->attributes['users']) ?? [])
            ->select('id', 'name')
            ->get();
    }
}
