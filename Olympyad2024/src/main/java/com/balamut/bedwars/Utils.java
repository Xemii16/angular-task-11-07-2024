package com.balamut.bedwars;

import java.util.ArrayList;

public class Utils {

    public static int gcd(int num1, int num2) {
        if (num1 < 0 || num2 < 0) {
            throw new ArithmeticException();
        }

        if (num1 == 0 || num2 == 0) {
            return Math.abs(num1 - num2);
        }

        while (num1 % num2 != 0) {
            int remainder = num1 % num2;
            num1 = num2;
            num2 = remainder;
        }
        return num2;
    }

    public static int gcd(int[] numbers) {
        int result = 0;
        for (final var number : numbers) {
            result = gcd(result, number);
        }

        return result;
    }

    protected static long getSum(int l, int r, ArrayList<Long> pref) {
        if (l > r)
            return 0L;
        long l_sum = (l > 0 ? pref.get(l - 1) : 0L);
        if (r >= pref.size()) {
            r -= pref.size();
            r++;
            return pref.get(pref.size() - 1) - l_sum + pref.get(r);
        } else {
            return pref.get(r) - l_sum;
        }
    }


}
