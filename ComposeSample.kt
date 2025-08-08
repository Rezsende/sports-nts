package com.example.composesample

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun EventBox() {
    Box(
        modifier = Modifier
            .background(Color.Green)
            .padding(8.dp)
            .clip(RoundedCornerShape(10.dp))
    ) {
        Text(
            text = "Pigz para eventos!", 
            fontSize = 18.sp, 
            fontWeight = FontWeight.SemiBold
        )
    }
}