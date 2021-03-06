﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GuaranteedIncome.Models
{
    public static class MarketData
    {
        public static double FixedRate = .03;
        public static double FixedDeviation = 0;

        public static double FixedIndexedRate = .1;
        public static double FixedIndexedDeviation = .15;

        public static double VariableRate = .09;
        public static double VariableDeviation = .12;

        public static double BrokerageRate = .09;
        public static double BrokerageDeviation = .12;
    }
}
