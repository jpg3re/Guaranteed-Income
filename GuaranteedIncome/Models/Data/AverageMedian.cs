﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuaranteedIncome.Models
{
    public static class AverageMedian
    {
        public static double calcPercentageAbove(double[]averages,double median)
        {
            double count = 0;
            for(int i = 0; i < averages.Length; i++)
            {

                if (median < averages[i])
                {
                    count++;
                }
            }
            return count / averages.Length;
        }
       
    }
}
