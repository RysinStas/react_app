<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['content'];

    protected $guarded = ['user_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function hashtags() {
        return $this->belongsToMany(Hashtag::class);
    }

}
