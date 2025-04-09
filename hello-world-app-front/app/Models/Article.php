<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'description',
        'body',
        'tagList',
        'favorited',
        'favoritesCount',
        'author_id'
    ];

    protected $casts = [
        'tagList' => 'array',
        'favorited' => 'boolean'
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
